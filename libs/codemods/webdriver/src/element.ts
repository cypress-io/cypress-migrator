import { ASTNode, ASTPath, CallExpression, Collection, JSCodeshift } from 'jscodeshift'
import { CodeModNode, Selector } from '../../src/lib/types'
import { getPropertyName, replaceCySelector } from '../../src/lib/utils'

import { elementMethodTransforms } from './constants'

export function transformElement(j: JSCodeshift, nodes: Collection<CodeModNode>): Collection<CodeModNode> {
  return nodes.forEach((path: ASTPath<CodeModNode>) => {
    const { value } = path
    console.log('🚀 ~ file: element.ts ~ line 8 ~ returnnodes.forEach ~ value', value)
    const propertyName = value.callee.type === 'MemberExpression' ? getPropertyName(value.callee) : value.callee.name
    console.log('🚀 ~ file: element.ts ~ line 12 ~ returnnodes.forEach ~ propertyName', propertyName)

    // transform $$('item').get(1)
    if (propertyName === '$$' && path.parentPath.value.property?.name === 'get') {
      path.parentPath.value.property.name = 'eq'
    }

    const replacedMethod = elementMethodTransforms[propertyName] ?? propertyName
    console.log('🚀 ~ file: element.ts ~ line 20 ~ returnnodes.forEach ~ replacedMethod', replacedMethod)
    // transform locators in cyGetLocators list
    // handleCyGetTransform(j, path, propertyName as CyGetLocators)

    // transform locators in cyContainLocators list
    // handleCyContainsTransform(j, path, propertyName as CyContainLocatorsKeys)

    // if (unsupportedLocators.includes(propertyName as UnsupportedLocators)) {
    // allow xpath selector to be transformed to cy.xpath
    return j(path as ASTPath<ASTNode>).replaceWith(() => {
      replaceCySelector(j, path.value, replacedMethod)
    })
    // }
  })
}
