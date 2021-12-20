import { ASTNode, ASTPath, CallExpression, Collection, FileInfo, JSCodeshift, Printable } from 'jscodeshift'

import {
  browserMethodTransforms,
  SupportedBrowserMethods,
  supportedBrowserMethods,
  UnsupportedBrowserMethods,
  unsupportedBrowserMethods,
  BrowserSelectors,
  browserSelectors,
} from './constants'
import { errorMessage, getIdentifier, replaceCySelector } from '../utils'
import { CodeModNode } from '../types'

export function removeUnsupportedBrowserMethods(
  report: (msg: string) => void,
  nodes: Collection<CodeModNode>,
  file: FileInfo,
): Collection<CodeModNode> {
  return nodes
    .filter((path: ASTPath<CodeModNode>) => {
      const identifier: CodeModNode = getIdentifier(path.node.callee)

      return (
        browserSelectors.includes(identifier?.name as BrowserSelectors) &&
        unsupportedBrowserMethods.includes(path.node.callee.property.name as UnsupportedBrowserMethods)
      )
    })
    .forEach(() => {
      return (path: ASTPath<CodeModNode>) =>
        report(
          errorMessage(
            `This codemod does not support transforming browser.${path.node.callee.property.name}(). Instead, it removes the method entirely.`,
            path.value as Printable,
            file,
          ),
        )
    })
    .remove()
}

export function transformBrowserMethods(j: JSCodeshift, nodes: Collection<CodeModNode>): Collection<CodeModNode> {
  return nodes
    .filter((path: ASTPath<CodeModNode>) => {
      const identifier = getIdentifier(path.value)

      return (
        browserSelectors.includes(identifier?.name as BrowserSelectors) &&
        supportedBrowserMethods.includes(path.node.callee.property.name as SupportedBrowserMethods)
      )
    })
    .forEach((path: ASTPath<CodeModNode>) => {
      const { node, parentPath } = path
      const method = node.callee.property.name
      const replacedMethod = browserMethodTransforms[method] ?? method

      // transform browser.wait()
      if (method === 'wait') {
        return j(path as ASTPath<ASTNode>).replaceWith((path: ASTPath<CodeModNode>) => {
          const waitTransform: CallExpression = replaceCySelector(j, path.value, 'wait')

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
        return j(path as ASTPath<ASTNode>).replaceWith(
          j.callExpression(
            j.memberExpression(
              j.callExpression(j.memberExpression(j.identifier('cy'), j.identifier('get'), false), [
                node.callee.object.arguments[0].name
                  ? j.identifier(node.callee.object.arguments[0].name)
                  : j.stringLiteral(
                      transformedArg && transformedArg.arguments[0]
                        ? transformedArg.arguments[0]['value']
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
        return j(path as ASTPath<ASTNode>).replaceWith(
          j.callExpression(j.memberExpression(j.identifier('cy'), j.identifier('location'), false), [
            j.stringLiteral('href'),
          ]),
        )
      }

      // transform browser.setLocation()
      if (method === 'setLocation') {
        return j(path as ASTPath<ASTNode>).forEach((path: any) => {
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

      return j(path as ASTPath<ASTNode>).replaceWith(
        replaceCySelector(j, method === 'findElement' ? node.arguments[0] : path.value, replacedMethod),
      )
    })
}

export function transformBrowserNavigate(
  j: JSCodeshift,
  root: Collection<CodeModNode>,
): Collection<CallExpression> | void {
  browserSelectors.forEach((selector) => {
    return root
      .find(j.CallExpression, {
        callee: {
          object: {
            callee: {
              object: {
                name: selector,
              },

              property: {
                name: 'navigate',
              },
            },
          },
        },
      })
      .replaceWith((path: ASTPath<CallExpression>) =>
        j.callExpression(j.memberExpression(j.identifier('cy'), j.identifier('go'), false), [
          j.stringLiteral((path.node.callee as CodeModNode).property.name),
        ]),
      )
  })
}
