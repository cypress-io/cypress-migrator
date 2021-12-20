import { API, ASTPath, AwaitExpression, ClassMethod, Collection, FileInfo, JSCodeshift, Transform } from 'jscodeshift'
import { CodeModNode, ExpressionKind, Selector } from '../types'
import { getPropertyName, isSelector, removeByPath, sanitize } from '../utils'
import { transformAssertions } from './assertions'
import { removeUnsupportedBrowserMethods, transformBrowserMethods, transformBrowserNavigate } from './browser'
import { nonLocatorMethodTransforms } from './constants'
import { transformLocators } from './locators'

const transformer: Transform = (file: FileInfo, api: API): string => {
  file.source = sanitize(file.source)
  const j: JSCodeshift = api.jscodeshift
  const root: Collection = j(file.source)

  /**
   * Get callExpressions by their AST path
   * @param  {ExpressionKind} path?
   */
  function getCallExpressions(path?: ExpressionKind): Collection<CodeModNode> {
    return root.find(j.CallExpression, path) as Collection<CodeModNode>
  }

  // all class methods
  const classMethods: Collection<ClassMethod> = root.find(j.ClassMethod)
  // all awaits
  const awaitExpressions: Collection<AwaitExpression> = root.find(j.AwaitExpression)

  // generic ast call expressions
  const callExpressions: Collection<CodeModNode> = getCallExpressions()

  // all element() nodes
  const elementExpressions = getCallExpressions({
    callee: {
      name: 'element',
    },
  } as ExpressionKind)

  // all element.all() nodes
  const elementAllExpressions: Collection<CodeModNode> = getCallExpressions({
    callee: {
      object: {
        name: 'element',
      },
      property: {
        name: 'all',
      },
    },
  } as ExpressionKind)

  // all expect() nodes
  const expectStatements: Collection<CodeModNode> = getCallExpressions({
    callee: {
      object: {
        callee: {
          name: 'expect',
        },
      },
    },
  } as ExpressionKind)

  // all expect() nodes that include .not
  const negatedExpectStatements: Collection<CodeModNode> = getCallExpressions({
    callee: {
      object: {
        object: {
          callee: {
            name: 'expect',
          },
        },
        property: {
          name: 'not',
        },
      },
    },
  } as ExpressionKind)

  // remove element() wrappers
  if (elementExpressions.size() > 0) {
    elementExpressions.replaceWith((path: ASTPath<CodeModNode>) => path.node.arguments[0])
  }

  // remove elementAll() wrappers
  if (elementAllExpressions.size() > 0) {
    elementAllExpressions.replaceWith((path: ASTPath<CodeModNode>) => path.node.arguments[0])
  }

  // remove async, private/protected, and return types from each class method
  if (classMethods.size() > 0) {
    classMethods.forEach((method: ASTPath<ClassMethod>) => {
      // remove async
      method.node.async = false
      // remove return types
      method.node.returnType = null
      // set all private/protected class methods to public
      if (method.node.accessibility) {
        method.node.accessibility = null
      }
    })
  }
  // remove all protractor imports
  removeByPath(root, j.ImportDeclaration, {
    source: { value: 'protractor' },
  })

  // remove implicit waits
  removeByPath(root, j.CallExpression, {
    callee: {
      property: {
        name: 'implicitlyWait',
      },
    },
  })

  // remove browser assignment expressions (eg. browser.ignoreSynchronization = true)
  removeByPath(root, j.AssignmentExpression, {
    left: {
      object: {
        name: 'browser',
      },
    },
  })

  // remove browser methods that are not supported
  removeUnsupportedBrowserMethods(api.report, callExpressions, file)

  // transform browser methods
  transformBrowserMethods(j, callExpressions)

  // transform browser.navigate()
  transformBrowserNavigate(j, root)

  // transform assertion statements
  transformAssertions(j, expectStatements as Collection<CodeModNode>, file) as CodeModNode
  transformAssertions(j, negatedExpectStatements as Collection<CodeModNode>, file) as CodeModNode

  // transform locators
  transformLocators(j, callExpressions)

  // remove await expressions
  if (awaitExpressions.size() > 0) {
    awaitExpressions.replaceWith((path: ASTPath<any>) => path.node.argument)
  }

  // transform non-selector expressions
  callExpressions
    .filter((path: ASTPath<CodeModNode>) => path.node?.callee && !isSelector(path.node.callee as Selector))
    .forEach((path: any) => {
      const { node } = path
      const propertyName =
        node.callee.type === 'MemberExpression' && node.callee.property
          ? getPropertyName(node.callee)
          : node.callee.name
      const pathArguments = path.get('arguments')

      if (nonLocatorMethodTransforms[propertyName]) {
        node.callee.property.name = nonLocatorMethodTransforms[propertyName]
      }

      // transforms items like element(by.css('.this-class')).getWebElement()
      else if (propertyName === 'getWebElement') {
        return j(path).replaceWith(
          j.callExpression(
            j.memberExpression(
              j.identifier(node.callee.object.callee.object.name),
              j.identifier(node.callee.object.callee.property.name),
              false,
            ),
            [j.stringLiteral(node.callee.object.arguments[0].value)],
          ),
        )
      }

      // transforms el.getAttribute('abc') into cy.get(el).invoke('attr', 'abc')
      else if (propertyName === 'getAttribute') {
        return j(path).replaceWith(
          j.callExpression(
            j.memberExpression(
              j.callExpression(j.memberExpression(j.identifier('cy'), j.identifier('get'), false), [
                j.identifier(node.callee.object.name),
              ]),
              j.identifier('invoke'),
              false,
            ),
            [j.stringLiteral('attr'), j.stringLiteral(`${pathArguments.value[0].value}`)],
          ),
        )
      }

      //transforms get into eq
      else if (propertyName === 'get' && node.callee?.object.callee?.property.name === 'get') {
        node.callee.property.name = 'eq'
      }
    })

  // ensure all variable declarations using cy. get wrapped in an arrow function
  root
    .find(j.VariableDeclarator)
    .filter((path: any) => {
      return path?.value?.init?.callee?.object?.name === 'cy'
    })
    .forEach((path: any) => {
      path.value.init = j.arrowFunctionExpression(
        [],
        j.callExpression(
          path.value.init.callee,
          path.value.init.arguments.length > 0 ? [path.value.init.arguments?.[0]] : [],
        ),
      )
    })

  // ensure all assignments using cy. get wrapped in an arrow function
  root
    .find(j.AssignmentExpression)
    .filter((path: any) => {
      return path.value.right.callee.object.name === 'cy'
    })
    .forEach((path: any) => {
      path.value.right = j.arrowFunctionExpression(
        [],
        j.callExpression(
          path.value.right.callee,
          path.value.right.arguments.length > 0 ? [path.value.right.arguments[0]] : [],
        ),
      )
    })

  return root.toSource({ quote: 'single' })
}

export default transformer
