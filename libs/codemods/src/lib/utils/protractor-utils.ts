import { ExpressionKind } from 'ast-types/gen/kinds'
import { Type } from 'ast-types/lib/types'
import * as chalk from 'chalk'
import { CallExpression, Collection, FileInfo, Identifier, JSCodeshift, Printable } from 'jscodeshift'
import { ProtractorSelectors, protractorSelectors } from '../protractor/constants'
import { CodeModNode, CodeModNodeKeys, ReplacementValues, Selector, TypedElementInExpression } from '../types'
/**
 * Check to see if path is a selector.
 *
 * @param  {Selector} path Selector
 * @returns {boolean} boolean
 */
export function isSelector(path: Selector): boolean {
  if (!path) {
    return false
  }

  return (
    (path.object && protractorSelectors.includes(path.object.name as ProtractorSelectors)) ||
    (path.property && protractorSelectors.includes(path.property.name as ProtractorSelectors)) ||
    protractorSelectors.includes(path?.name as ProtractorSelectors)
  )
}

/**
 *
 * @param {CodeModNode} node CodeModNOde
 * @returns {string | CodeModNode | CodeModNode[]} string | CodeModNode | CodeModNode[]}
 */
export function getAssertionTarget(node: CodeModNode): string | CodeModNode | CodeModNode[] {
  if (node.type === 'Identifier') {
    return node
  }

  return node.arguments ? (node.arguments as CodeModNode[])[0] : getAssertionTarget(node?.object as CodeModNode)
}

/**
 *
 * @param {CodeModNode} node CodeModNode
 * @returns {string} string
 */
export function getAssertionTargetType(node: CodeModNode): string {
  if (!node?.callee && node?.type === 'Identifier') {
    return node?.name as string
  }
  if (node?.callee?.type === 'MemberExpression' && node?.callee?.property) {
    return node?.callee?.property?.name as string
  }

  return getAssertionTargetType((node?.arguments as CodeModNode[])[0])
}

/**
 * Find root identifier within path
 * ie. browser from browser.navigate().forward()
 *
 * @param  {CodeModNode} path? CodeModNode?
 * @returns {Identifier | null} Identifier | null
 */
export function getIdentifier(path?: CodeModNode): CodeModNode | null {
  if (!path) {
    return null
  }

  return path.type === 'Identifier' ? path : getIdentifier(path.callee?.object || path.object)
}

/**
 * Get selector from path
 *
 * @param  {CodeModNode} path CodeModNode
 * @returns {string} string
 */
export function getPropertyName(path: CodeModNode): string | undefined {
  if (path && path.property) {
    const prop = path.property
    return (prop as Identifier).name
  }

  return
}

/**
 *
 * @param {CodeModNode} path CodeModNode
 * @param {string} elementName string
 * @returns {TypedElementInExpression} TypedElementInExpression
 */
export function findElementInExpression(path: CodeModNode, elementName: CodeModNodeKeys): TypedElementInExpression {
  return path[elementName]
    ? (path[elementName] as TypedElementInExpression)
    : findElementInExpression(path?.callee as CodeModNode, elementName)
}
/**
 * Determine if node has specific property
 *
 * @param  {CodeModNode} node CodeModNode
 * @param  {string} name string
 * @returns {boolean} boolean
 */
export function hasProperty(node: CodeModNode, name: string): boolean {
  return node.type === 'MemberExpression' && !!node?.property?.name && node?.property?.name === name
}

/**
 * Set property
 * @param  {CodeModNode} node CodeModNode
 * @param  {Identifier} propertyName Identifier
 * @param  {CodeModNode} args[] CodeModNode[]
 * @returns {CodeModNode} CodeModNode
 */
export function setProperty(node: CodeModNode, property: Identifier, args?: CodeModNode[]): CodeModNode {
  if (node.callee?.property) node.callee.property = property
  node.arguments = args ?? []

  return node
}

/**
 * Remove element by its ast path
 *
 * @param  {Collection<T>} root Collection<T extends CodeModNode>
 * @param  {Type<T>} expression Type<T extends CodeModNode>
 * @param  {CodeModNode} path T extends CodeModNode
 * @returns Collection<T extends CodeModNode>
 */
export function removeByPath<T extends CodeModNode>(root: Collection<T>, expression: Type<T>, path: T): Collection<T> {
  return root.find<T>(expression, path).remove()
}

/**
 * If a given selector is found use its value, otherwise use the default
 *
 * @param  {string} value string
 * @param  {string} selector? string
 * @returns {string} string
 */
export function replaceValue(value: string, selector?: string): string {
  const replacements: ReplacementValues = {
    className: `.${value}`,
    id: `#${value}`,
    name: `input[name="${value}"]`,
    model: `[ng-model="${value}"]`,
    binding: `[ng-bind="${value}"]`,
    options: `[ng-options="${value}"]`,
  }

  return selector && replacements[selector] ? replacements[selector] : value
}

/**
 * Replace a given selector with its cy equivalent
 *
 * @param  {JSCodeshift} j
 * @param  {CodeModNode} path
 * @param  {string} method
 * @param  {string} selector?
 */
export function replaceCySelector(
  j: JSCodeshift,
  path: CodeModNode,
  method: string,
  selector?: string,
): CallExpression {
  const nodeArgs = path.arguments

  return j.callExpression(
    j.memberExpression(j.identifier('cy'), j.identifier(method), false),
    (nodeArgs as CodeModNode[])?.length > 0
      ? [
          typeof (nodeArgs as CodeModNode[])[0]?.value === 'string'
            ? j.stringLiteral(replaceValue((nodeArgs as CodeModNode[])[0]?.value as string, selector))
            : (nodeArgs as ExpressionKind[])[0],
        ]
      : [],
  )
}

/**
 *
 * @param {JSCodeshift} j JSCodeshift
 * @param {string} propertyName string
 * @param {string} transformedPropertyName string
 * @param { ExpressionKind[]} args ExpressionKind[]
 * @returns {CallExpression} CallExpression
 */
export function replaceCyContainsSelector(
  j: JSCodeshift,
  propertyName: string,
  transformedPropertyName: string,
  args: ExpressionKind[],
): CallExpression {
  return j.callExpression(
    j.memberExpression(
      j.callExpression(j.memberExpression(j.identifier('cy'), j.identifier('get'), false), [
        propertyName === 'cssContainingText' ? args[0] : j.stringLiteral(transformedPropertyName),
      ]),
      j.identifier('contains'),
      false,
    ),
    [propertyName === 'cssContainingText' ? args[1] : args[0]],
  )
}

/**
 *
 * @param {string} message string
 * @param {Printable} expr Printable
 * @param {FileInfo} file FileInfo
 * @returns {string} string
 */
export function errorMessage(message: string, expr: Printable, file: FileInfo): string {
  if (!expr.loc) {
    return 'Internal Error'
  }
  const source: string[] = file.source.split('\n')
  const line: string = source.slice(expr?.loc?.start?.line - 1, expr.loc.end.line)[0] as string
  const expression: string = line.slice(0, expr?.loc?.end?.column) as string

  const chalkErrorMessage = chalk.bold.red

  const logMessage: string = chalkErrorMessage(message)

  const fullMessage: string =
    '\n\n' + `> ${expression}\n` + ' '.repeat(expr?.loc?.start?.column + 2) + '^\n\n' + logMessage + '\n\n'

  return fullMessage
}
