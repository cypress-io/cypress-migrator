import {
  ASTNode,
  ASTPath,
  CallExpression,
  Collection,
  FileInfo,
  JSCodeshift,
  MemberExpression,
  Printable,
  StringLiteral,
} from 'jscodeshift'
import {
  CodeModNode,
  TypedElementInExpression,
  CyGetLocatorsObject,
  ProtractorSelectorsObject,
  CodemodConstantTypesObject,
} from '../types'
import {
  errorMessage,
  findElementInExpression,
  getAssertionTarget,
  getAssertionTargetType,
  getPropertyName,
  hasProperty,
  replaceCyContainsSelector,
  replaceCySelector,
} from '../utils'
import {
  assertionTransforms,
  cyContainLocators,
  cyGetLocators,
  CyGetLocators,
  SupportedAssertionTypes,
  supportedAssertionTypes,
} from './constants'

// transform cyGetLocators items into cy.get()
// transform cyContainLocators items into cy.contains()
//
// exclude non-locators and assertions from this group

function getAssertionTargetExpression(
  j: JSCodeshift,
  assertionTarget: string | CodeModNode | CodeModNode[],
): CodeModNode | CodeModNode[] | CallExpression {
  if ((assertionTarget as CodeModNode).type === 'Identifier') {
    return assertionTarget as CodeModNode
  } else if ((assertionTarget as CodeModNode).callee) {
    if ((assertionTarget as CodeModNode).callee.object.name === 'cy') {
      return j.callExpression(
        j.memberExpression(
          (assertionTarget as CodeModNode).callee.object as MemberExpression,
          (assertionTarget as CodeModNode).callee.property as MemberExpression,
          false,
        ),
        ((assertionTarget as CodeModNode).arguments as CodeModNode[]).length
          ? ((assertionTarget as CodeModNode).arguments as MemberExpression[])
          : [],
      )
    }
    return (assertionTarget as CodeModNode).callee.object
  } else {
    return (assertionTarget as CodeModNode).arguments[0].callee.object
  }
}

export function transformAssertions(
  j: JSCodeshift,
  nodes: Collection<CodeModNode>,
  file: FileInfo,
): Collection<CodeModNode> {
  return nodes
    .filter((path: ASTPath<CodeModNode>): boolean => {
      return (
        path.value.callee.property &&
        supportedAssertionTypes.includes(path.value.callee.property.name as SupportedAssertionTypes)
      )
    })
    .forEach((assertion: ASTPath<CodeModNode>): void => {
      const assertionType: string = assertion.value.callee.property.name
      const assertionTarget: string | CodeModNode | CodeModNode[] = getAssertionTarget(assertion.value.callee.object)
      const assertionTargetType: string = getAssertionTargetType(assertionTarget as CodeModNode)
      const assertionTargetExpression: string | CallExpression | CodeModNode | CodeModNode[] =
        getAssertionTargetExpression(j, assertionTarget)

      const hasCount: boolean =
        (assertionTarget as CodeModNode).callee && hasProperty((assertionTarget as CodeModNode).callee, 'count')
      const hasNegative: boolean =
        ['toBeFalse', 'toBeFalsy'].includes(assertionType) ||
        hasProperty(assertion.value.callee.object, 'not') ||
        ((assertion.value?.arguments as CodeModNode[]).length > 0 && assertion.value?.arguments[0].value === false)
      const transformedAssertion: string =
        assertionTargetType && assertionTransforms[assertionTargetType]
          ? assertionTransforms[assertionTargetType]
          : assertionTransforms[assertionType]

      // TODO: add error message if no transformedAssertion

      const fullyTransformedAssertion: string = hasNegative ? `not.${transformedAssertion}` : transformedAssertion

      const assertionArgs: StringLiteral[] = [j.stringLiteral(fullyTransformedAssertion)]

      // add arguments of literal types to assertion
      if (
        (assertion.value.arguments as CodeModNode[]).length > 0 &&
        typeof assertion.value.arguments[0].value !== 'boolean'
      ) {
        assertionArgs.push(assertion.value.arguments[0] as StringLiteral)
      }

      j(assertion as ASTPath<ASTNode>).replaceWith((): string | CallExpression => {
        // transform assertion that includes count()
        if (hasCount) {
          const countAssertion: TypedElementInExpression = findElementInExpression(
            (assertionTarget as CodeModNode).callee.object,
            'property',
          )
          let transformedCountSelector: CallExpression

          if (cyGetLocators.includes((countAssertion as CyGetLocatorsObject).name)) {
            transformedCountSelector = replaceCySelector(
              j,
              (assertionTarget as CodeModNode).callee.object,
              'get',
              (countAssertion as CyGetLocatorsObject).name,
            )
          }

          if (cyContainLocators[(countAssertion as CyGetLocatorsObject).name]) {
            transformedCountSelector = replaceCyContainsSelector(
              j,
              (countAssertion as ProtractorSelectorsObject).name,
              cyContainLocators[(countAssertion as ProtractorSelectorsObject).name],
              (assertionTarget as CodeModNode).callee.object.callee.arguments as CodeModNode[],
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
            : errorMessage(
                `${(countAssertion as CodemodConstantTypesObject).name} is not currently supported by this codemod.`,
                countAssertion as Printable,
                file,
              )
        } else {
          return j.callExpression(
            j.memberExpression(assertionTargetExpression as CallExpression, j.identifier('should'), false),
            assertionArgs,
          )
        }
      })
    })
    .forEach((path: ASTPath<CodeModNode>) => {
      if (path.value.callee.object.callee) {
        const propertyName = getPropertyName(path.value.callee.object.callee)

        if (propertyName && cyGetLocators.includes(propertyName as CyGetLocators)) {
          path.value.callee.object = replaceCySelector(j, path.value.callee.object, 'get', propertyName) as CodeModNode
        }
      }
    })
}
