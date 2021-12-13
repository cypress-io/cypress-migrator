import { ASTNode, ASTPath, CallExpression, Collection, JSCodeshift } from 'jscodeshift'

import {
  cyGetLocators,
  cyContainLocators,
  supportedAssertionTypes,
  unsupportedLocators,
  CyGetLocators,
  CyContainLocatorsKeys,
  SupportedAssertionTypes,
  UnsupportedLocators,
} from './constants'
import { isSelector, getPropertyName, replaceCySelector, replaceCyContainsSelector } from '../utils'
import { CodeModNode, Selector } from '../types'

// transform cyGetLocators items into cy.get()
// transform cyContainLocators items into cy.contains()
export function handleCyGetTransform(
  j: JSCodeshift,
  path: CodeModNode,
  propertyName: CyGetLocators,
): Collection<CallExpression> | undefined {
  // if $$ is after another expression, transform it into .find()
  // otherwise, transform $, $$, and by locators as documented
  if (propertyName === '$$' && !!path.value && !!path.value.callee && path.value?.callee.object) {
    ;((path.value.callee as CodeModNode).property as CodeModNode).name = 'find'
  } else {
    if (cyGetLocators.includes(propertyName as CyGetLocators)) {
      return j(path as ASTNode).replaceWith((path: any) => {
        return replaceCySelector(j, path.value, 'get', propertyName)
      })
    }
  }
  return
}

// transform locators in cyContainLocators list
export function handleCyContainsTransform(
  j: JSCodeshift,
  path: CodeModNode,
  propertyName: CyContainLocatorsKeys,
): Collection<CallExpression> | undefined {
  const args = path.value ? path.value.arguments : path.arguments
  if (propertyName in cyContainLocators) {
    return j(path as ASTNode).replaceWith(() => {
      return replaceCyContainsSelector(j, propertyName, cyContainLocators[propertyName], args as CodeModNode[])
    })
  }

  return
}

// exclude non-locators and assertions from this group

export function transformLocators(j: JSCodeshift, nodes: Collection<CodeModNode>): Collection<CodeModNode> {
  return nodes
    .filter((path: ASTPath<CodeModNode>): boolean => {
      return path.value?.callee &&
        isSelector(path.value.callee as Selector) &&
        !supportedAssertionTypes.includes(path.value?.callee?.property?.name as SupportedAssertionTypes)
        ? true
        : false
    })
    .forEach((path: ASTPath<CodeModNode>) => {
      const { value } = path
      const propertyName: string =
        !!value.callee && value.callee.type === 'MemberExpression'
          ? getPropertyName(value.callee)
          : ((value.callee as CodeModNode).name as string)

      // transform $$('item').get(1)
      if (propertyName === '$$' && path.parentPath.value.property?.name === 'get') {
        path.parentPath.value.property.name = 'eq'
      }

      // transform locators in cyGetLocators list
      handleCyGetTransform(j, path, propertyName as CyGetLocators)

      // transform locators in cyContainLocators list
      handleCyContainsTransform(j, path, propertyName as CyContainLocatorsKeys)

      if (unsupportedLocators.includes(propertyName as UnsupportedLocators)) {
        // allow xpath selector to be transformed to cy.xpath
        return j(path as ASTPath<ASTNode>).replaceWith(() => {
          return replaceCySelector(j, path.value, propertyName)
        })
      }

      return
    })
}
