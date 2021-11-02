import {
  API,
  AssignmentExpression,
  ASTNode,
  ASTPath,
  AwaitExpression,
  CallExpression,
  ClassMethod,
  Collection,
  FileInfo,
  JSCodeshift,
  Transform,
  VariableDeclarator,
} from 'jscodeshift'
import { CodeModNode, ExpressionKind, Selector } from '../types'
import { getPropertyName, isSelector, removeByPath } from '../utils'
import { transformAssertions } from './assertions'
import { removeUnsupportedBrowserMethods, transformBrowserMethods, transformBrowserNavigate } from './browser'
import { nonLocatorMethodTransforms } from './constants'
import { transformLocators } from './locators'

const needsSanitized = (value: string): boolean => {
  switch (value[value.length - 1]) {
    case '.':
    case '(':
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      return true

    default:
      return false
  }
}

const sanitize = (value: string): string => {
  return needsSanitized(value) ? sanitize(value.slice(0, -1)) : value
}

const transformer: Transform = (file: FileInfo, api: API): string => {
  file.source = sanitize(file.source)
  const j: JSCodeshift = api.jscodeshift
  const root: Collection = j(file.source)

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

  // remove element() wrappers
  if (elementExpressions.size() > 0) {
    elementExpressions.replaceWith((path: ASTPath<CodeModNode>) => (path.node.arguments as CodeModNode[])[0])
  }

  // remove elementAll() wrappers
  if (elementAllExpressions.size() > 0) {
    elementAllExpressions.replaceWith((path: ASTPath<CodeModNode>) => (path.node.arguments as CodeModNode[])[0])
  }

  // remove await expressions
  if (awaitExpressions.size() > 0) {
    awaitExpressions.replaceWith((path: ASTPath<AwaitExpression>) => path.node.argument)
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

  // transform locators
  transformLocators(j, callExpressions)

  // transform non-selector expressions
  callExpressions
    .filter((path: ASTPath<CodeModNode>) => !!path.node?.callee && !isSelector(path.node.callee as Selector))
    .forEach((path: ASTPath<CodeModNode>): void | Collection<CallExpression> => {
      const { node }: { node: CodeModNode } = path
      const propertyName: string =
        node.callee?.type === 'MemberExpression' && node.callee?.property
          ? (getPropertyName(node.callee) as string)
          : (node.callee?.name as string)
      const pathArguments = path.get('arguments')

      if (nonLocatorMethodTransforms[propertyName] && node?.callee?.property) {
        node.callee.property.name = nonLocatorMethodTransforms[propertyName]
      }

      // transforms items like element(by.css('.this-class')).getWebElement()
      else if (propertyName === 'getWebElement') {
        return j(path as ASTPath<ASTNode>).replaceWith(
          j.callExpression(
            j.memberExpression(
              j.identifier(node.callee?.object?.callee?.object?.name as string),
              j.identifier(node.callee?.object?.callee?.property?.name as string),
              false,
            ),
            [j.stringLiteral((node.callee?.object?.arguments as CodeModNode[])[0].value as string)],
          ),
        )
      }

      // transforms el.getAttribute('abc') into cy.get(el).invoke('attr', 'abc')
      else if (propertyName === 'getAttribute') {
        return j(path as ASTPath<ASTNode>).replaceWith(
          j.callExpression(
            j.memberExpression(
              j.callExpression(j.memberExpression(j.identifier('cy'), j.identifier('get'), false), [
                j.identifier(node.callee?.object?.name as string),
              ]),
              j.identifier('invoke'),
              false,
            ),
            [j.stringLiteral('attr'), j.stringLiteral(`${pathArguments.value[0].value}`)],
          ),
        )
      }
    })

  // ensure all variable declarations using cy. get wrapped in an arrow function
  root
    .find(j.VariableDeclarator)
    .filter((path: ASTPath<VariableDeclarator>) => {
      return (path?.value?.init as CodeModNode)?.callee?.object?.name === 'cy'
    })
    .forEach((path: ASTPath<VariableDeclarator>) => {
      path.value.init = j.arrowFunctionExpression(
        [],
        j.callExpression(
          (path.value.init as CallExpression).callee,
          ((path.value.init as CodeModNode).arguments as ExpressionKind[]).length > 0
            ? [((path.value.init as CodeModNode)?.arguments as ExpressionKind[])?.[0]]
            : [],
        ),
      )
    })

  // ensure all assignments using cy. get wrapped in an arrow function
  root
    .find(j.AssignmentExpression)
    .filter((path: ASTPath<AssignmentExpression>) => {
      return (path.value.right as CodeModNode)?.callee?.object?.name === 'cy'
    })
    .forEach((path: ASTPath<AssignmentExpression>) => {
      path.value.right = j.arrowFunctionExpression(
        [],
        j.callExpression(
          (path.value.right as CallExpression).callee,
          ((path.value.right as CodeModNode).arguments as ExpressionKind[]).length > 0
            ? [((path.value.right as CodeModNode).arguments as ExpressionKind[])[0]]
            : [],
        ),
      )
    })

  return root.toSource({ quote: 'single' })
}

export default transformer
