import { JSCodeshift } from 'jscodeshift'

import {
  supportedAssertionTypes,
  assertionTransforms,
  cyGetLocators,
  cyContainLocators,
  CyGetLocators,
} from './constants'
import {
  getPropertyName,
  getAssertionTarget,
  getAssertionTargetType,
  hasProperty,
  replaceCySelector,
  findElementInExpression,
  errorMessage,
  replaceCyContainsSelector,
} from '../utils'

// transform cyGetLocators items into cy.get()
// transform cyContainLocators items into cy.contains()
//
// exclude non-locators and assertions from this group

export function transformAssertions(j: JSCodeshift, nodes: any, file: any): any {
  return nodes
    .filter((path: any) => {
      return path.value.callee.property && supportedAssertionTypes.includes(path.value.callee.property.name)
    })
    .forEach((path: any) => {
      const assertion = path
      const assertionType = assertion.value.callee.property.name
      const assertionTarget = getAssertionTarget(assertion.value.callee.object)
      const assertionTargetType = getAssertionTargetType(assertionTarget)

      const assertionTargetExpression = () => {
        if (assertionTarget.type === 'Identifier') {
          return assertionTarget
        } else if (assertionTarget.callee) {
          if (assertionTarget.callee.object.name === 'cy') {
            return j.callExpression(
              j.memberExpression(assertionTarget.callee.object, assertionTarget.callee.property, false),
              assertionTarget.arguments.length ? assertionTarget.arguments : [],
            )
          }
          return assertionTarget.callee.object
        } else {
          return assertionTarget.arguments[0].callee.object
        }
      }

      const hasCount = assertionTarget.callee && hasProperty(assertionTarget.callee, 'count')
      const hasNegative =
        ['toBeFalse', 'toBeFalsy'].includes(assertionType) ||
        hasProperty(assertion.value, 'not') ||
        (assertion.value?.arguments.length > 0 && assertion.value?.arguments[0].value === false)
      const transformedAssertion =
        assertionTargetType && assertionTransforms[assertionTargetType]
          ? assertionTransforms[assertionTargetType]
          : assertionTransforms[assertionType]

      // TODO: add error message if no transformedAssertion

      const fullyTransformedAssertion = hasNegative ? `not.${transformedAssertion}` : transformedAssertion

      const assertionArgs = [j.stringLiteral(fullyTransformedAssertion)]

      // add arguments of literal types to assertion
      if (assertion.value.arguments.length > 0 && assertion.value.arguments[0].type !== 'BooleanLiteral') {
        assertionArgs.push(assertion.value.arguments[0])
      }

      j(path).replaceWith(() => {
        // transform assertion that includes count()
        if (hasCount) {
          const countAssertion = findElementInExpression(assertionTarget.callee.object, 'property')
          let transformedCountSelector

          if (cyGetLocators.includes(countAssertion.name)) {
            transformedCountSelector = replaceCySelector(j, assertionTarget.callee.object, 'get', countAssertion.name)
          }

          if (cyContainLocators[countAssertion.name]) {
            transformedCountSelector = replaceCyContainsSelector(
              j,
              countAssertion.name,
              cyContainLocators[countAssertion.name],
              assertionTarget.callee.object.callee.arguments,
            )
          }

          return transformedCountSelector
            ? j.callExpression(
                j.memberExpression(
                  j.callExpression(j.memberExpression(transformedCountSelector, j.identifier('its'), false), [
                    j.stringLiteral('length'),
                  ]),
                  j.identifier('should'),
                  false,
                ),
                assertionArgs,
              )
            : errorMessage(`${countAssertion.name} is not currently supported by this codemod.`, countAssertion, file)
        } else {
          return j.callExpression(
            j.memberExpression(assertionTargetExpression(), j.identifier('should'), false),
            assertionArgs,
          )
        }
      })
    })
    .forEach((path: any) => {
      if (path.value.callee.object.callee) {
        const propertyName = getPropertyName(path.value.callee.object.callee)

        if (propertyName && cyGetLocators.includes(propertyName as CyGetLocators)) {
          path.value.callee.object = replaceCySelector(j, path.value.callee.object, 'get', propertyName)
        }
      }
    })
}
