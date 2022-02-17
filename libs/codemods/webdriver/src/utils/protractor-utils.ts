import * as chalk from 'chalk'
import { CallExpression, Collection, FileInfo, Identifier, JSCodeshift, Printable } from 'jscodeshift'
import { ProtractorSelectors, protractorSelectors } from '../../../src/lib/common/constants'
import { CodeModNode, ReplacementValues, Selector, TypedElementInExpression } from '../../../src/lib/types'
/**
 * Check to see if path is a selector.
 *
 * @param  {Selector} path
 * @returns boolean
 */
export function isSelector(path: Selector): boolean {
  if (!path) {
    return false
  }

  return (
    (path.object && protractorSelectors.includes(path.object.name as ProtractorSelectors)) ||
    (path.property && protractorSelectors.includes(path.property.name as ProtractorSelectors)) ||
    protractorSelectors.includes(path.name)
  )
}

/**
 *
 * @param AssertionTarget node
 * @returns
 */
export function getAssertionTarget(node: CodeModNode): string | CodeModNode | CodeModNode[] {
  if (node.type === 'Identifier') {
    return node
  }

  return node.arguments ? node.arguments[0] : getAssertionTarget(node.object)
}

/**
 *
 * @param {CodeModNode} node
 * @returns string
 */
export function getAssertionTargetType(node: CodeModNode): string {
  if (!node.callee && node.type === 'Identifier') {
    return node.name
  }
  if (node.callee.type === 'MemberExpression' && node.callee.property) {
    return node.callee.property.name
  }

  return getAssertionTargetType(node.arguments[0])
}

/**
 * Find root identifier within path
 * ie. browser from browser.navigate().forward()
 *
 * @param  {CodeModNode} path?
 * @returns Identifier | null
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
 * @param  {CodeModNode} path
 * @returns string
 */
export function getPropertyName(path: CodeModNode): string {
  if (path && path.property) {
    const prop = path.property
    return (prop as Identifier).name
  }
}

/**
 *
 * @param {CodeModNode} path
 * @param {string} elementName
 * @returns TypedElementInExpression
 */
export function findElementInExpression(path: CodeModNode, elementName: string): TypedElementInExpression {
  return path[elementName] ? path[elementName] : findElementInExpression(path.callee, elementName)
}
/**
 * Determine if node has specific property
 *
 * @param  {CodeModNode} node
 * @param  {string} name
 * @returns boolean
 */
export function hasProperty(node: CodeModNode, name: string): boolean {
  return node.type === 'MemberExpression' && node.property && node.property.name === name
}

/**
 * Set property
 * @param  {any} node
 * @param  {Identifier} propertyName
 * @param  {any} args[]
 * @returns any
 */
export function setProperty(node: any, property: Identifier, args?: any[]): any {
  node.callee.property = property
  node.arguments = args ?? []

  return node
}

// type RemoveByPathPath = { source: { value: string }} | { callee: { property: { name: string }}} | { left: { object: { name: string }}}

/**
 * Remove element by its ast path
 *
 * @param  {Collection<T>} root
 * @param  {any} expression
 * @param  {CodeModNode} path
 * @returns any
 */
export function removeByPath<T extends CodeModNode>(
  root: Collection<T>,
  expression: any,
  path: CodeModNode,
): Collection<T> {
  return root.find<T>(expression, path).remove()
}

/**
 * If a given selector is found use its value, otherwise use the default
 *
 * @param  {string} value
 * @param  {string} selector?
 * @returns any
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
 * @param  {any} path
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
          typeof nodeArgs[0].value === 'string'
            ? j.stringLiteral(replaceValue(nodeArgs[0].value, selector))
            : nodeArgs[0],
        ]
      : [],
  )
}

export function replaceCyContainsSelector(
  j: JSCodeshift,
  propertyName: string,
  transformedPropertyName: string,
  args: any[],
) {
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

export function errorMessage(message: string, expr: Printable, file: FileInfo): string {
  const source = file.source.split('\n')
  const line = source.slice(expr.loc.start.line - 1, expr.loc.end.line)[0]
  const expression = line.slice(0, expr.loc.end.column)

  const chalkErrorMessage = chalk.bold.red

  const logMessage = chalkErrorMessage(message)

  const fullMessage =
    '\n\n' + `> ${expression}\n` + ' '.repeat(expr.loc.start.column + 2) + '^\n\n' + logMessage + '\n\n'

  return fullMessage
}
