import { JSCodeshift } from 'jscodeshift'

import { browserMethodTransforms, supportedBrowserMethods, unsupportedBrowserMethods } from './constants'
import { errorMessage, getIdentifier, replaceCySelector } from '../utils'

export function removeUnsupportedBrowserMethods(report: (msg: string) => void, nodes: any, file: any): any {
  return nodes
    .filter((path: any) => {
      const identifier = getIdentifier(path.node.callee)

      return identifier?.name === 'browser' && unsupportedBrowserMethods.includes(path.node.callee.property.name)
    })
    .forEach(() => {
      return (path: any) =>
        report(
          errorMessage(
            `This codemod does not support transforming browser.${path.node.callee.property.name}(). Instead, it removes the method entirely.`,
            path.value,
            file,
          ),
        )
    })
    .remove()
}

export function transformBrowserMethods(j: JSCodeshift, nodes: any): any {
  return nodes
    .filter((path: any) => {
      const identifier = getIdentifier(path.value)

      return identifier?.name === 'browser' && supportedBrowserMethods.includes(path.node.callee.property.name)
    })
    .forEach((path: any) => {
      const { node, parentPath } = path
      const method = node.callee.property.name
      const replacedMethod = browserMethodTransforms[method] ?? method

      // transform browser.wait()
      if (method === 'wait') {
        return j(path).replaceWith((path) => {
          const waitTransform = replaceCySelector(j, path.value, 'wait')

          return waitTransform
        })
      }

      // transform browser.actions()
      if (method === 'perform') {
        const propertyName = parentPath.value.expression.callee.object.callee.property.name

        const transformedArg =
          node.callee.object.arguments[0].callee &&
          replaceCySelector(
            j,
            node.callee.object.arguments[0],
            'get',
            node.callee.object.arguments[0].callee.property.name,
          )

        // if (path.parentPath.value.property.name === 'click' or in list of supported transforms) {
        return j(path).replaceWith(
          j.callExpression(
            j.memberExpression(
              j.callExpression(j.memberExpression(j.identifier('cy'), j.identifier('get'), false), [
                node.callee.object.arguments[0].name
                  ? j.identifier(node.callee.object.arguments[0].name)
                  : j.stringLiteral(
                      transformedArg && transformedArg.arguments[0]
                        ? transformedArg.arguments[0].value
                        : node.callee.object.arguments[0].arguments[0].value,
                    ),
              ]),
              j.identifier(
                supportedBrowserMethods.includes(propertyName) ? browserMethodTransforms[propertyName] : propertyName,
              ),
              false,
            ),
            [],
          ),
        )
      }

      // transform browser.getCurrentUrl()
      if (method === 'getCurrentUrl') {
        return j(path).replaceWith(
          j.callExpression(j.memberExpression(j.identifier('cy'), j.identifier('location'), false), [
            j.stringLiteral('href'),
          ]),
        )
      }

      // transform browser.setLocation()
      if (method === 'setLocation') {
        return j(path).forEach((path: any) => {
          const href = path.node.arguments[0].value

          j(path).replaceWith(
            j.callExpression(
              j.memberExpression(
                j.callExpression(j.memberExpression(j.identifier('cy'), j.identifier('get'), false), [
                  j.stringLiteral(`#${href}`),
                ]),
                j.identifier('scrollIntoView'),
                false,
              ),
              [],
            ),
          )
        })
      }

      return j(path).replaceWith(
        replaceCySelector(j, method === 'findElement' ? node.arguments[0] : path.value, replacedMethod),
      )
    })
}

export function transformBrowserNavigate(j: JSCodeshift, root: any): any {
  return root
    .find(j.CallExpression, {
      callee: {
        object: {
          callee: {
            object: {
              name: 'browser',
            },

            property: {
              name: 'navigate',
            },
          },
        },
      },
    })
    .replaceWith((path: any) =>
      j.callExpression(j.memberExpression(j.identifier('cy'), j.identifier('go'), false), [
        j.stringLiteral(path.node.callee.property.name),
      ]),
    )
}
