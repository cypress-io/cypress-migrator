import { API, ASTPath, ClassMethod, Transform } from 'jscodeshift'
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

const transformer: Transform = (file: { path: string; source: string }, api: API): string => {
  file.source = sanitize(file.source)
  const j = api.jscodeshift
  const root = j(file.source)

  function getCallExpressions(path?: any) {
    return root.find(j.CallExpression, path)
  }

  // all class methods
  const classMethods = root.find(j.ClassMethod)
  // all awaits
  const awaitExpressions = root.find(j.AwaitExpression)

  // generic ast call expressions
  const callExpressions = getCallExpressions()

  // all element() nodes
  const elementExpressions = getCallExpressions({
    callee: {
      name: 'element',
    },
  })

  // all element.all() nodes
  const elementAllExpressions = getCallExpressions({
    callee: {
      object: {
        name: 'element',
      },
      property: {
        name: 'all',
      },
    },
  })

  // all expect() nodes
  const expectStatements = getCallExpressions({
    callee: {
      object: {
        callee: {
          name: 'expect',
        },
      },
    },
  })

  // remove element() wrappers
  if (elementExpressions.size() > 0) {
    elementExpressions.replaceWith((path: any) => path.node.arguments[0])
  }

  // remove elementAll() wrappers
  if (elementAllExpressions.size() > 0) {
    elementAllExpressions.replaceWith((path: any) => path.node.arguments[0])
  }

  // remove await expressions
  if (awaitExpressions.size() > 0) {
    awaitExpressions.replaceWith((path: any) => path.node.argument)
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
  transformAssertions(j, expectStatements, file)

  // transform locators
  transformLocators(j, callExpressions)

  // transform non-selector expressions
  callExpressions
    .filter((path: any) => path.node?.callee && !isSelector(path.node.callee))
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
