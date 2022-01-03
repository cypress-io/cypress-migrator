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
    if ((((assertionTarget as CodeModNode).callee as CodeModNode)?.object as CodeModNode)?.name === 'cy') {
      return j.callExpression(
        j.memberExpression(
          ((assertionTarget as CodeModNode).callee as CodeModNode)?.object as MemberExpression,
          ((assertionTarget as CodeModNode).callee as CodeModNode)?.property as MemberExpression,
          false,
        ),
        ((assertionTarget as CodeModNode).arguments as CodeModNode[]).length
          ? ((assertionTarget as CodeModNode).arguments as MemberExpression[])
          : [],
      )
    }
    return ((assertionTarget as CodeModNode).callee as CodeModNode)?.object as CodeModNode
  } else {
    return (((assertionTarget as CodeModNode).arguments as CodeModNode[])[0]?.callee as CodeModNode)
      ?.object as CodeModNode
  }
}

export function transformAssertions(
  j: JSCodeshift,
  nodes: Collection<CodeModNode>,
  file: FileInfo,
): Collection<CodeModNode> {
  return nodes
    .filter((path: ASTPath<CodeModNode>): boolean => {
      return (path.value.callee as CodeModNode)?.property &&
        supportedAssertionTypes.includes(
          ((path.value.callee as CodeModNode)?.property as CodeModNode)?.name as SupportedAssertionTypes,
        )
        ? true
        : false
    })
    .forEach((assertion: ASTPath<CodeModNode>): void => {
      const assertionType: string = ((assertion.value.callee as CodeModNode)?.property as CodeModNode)?.name as string
      const assertionTarget: string | CodeModNode | CodeModNode[] = getAssertionTarget(
        (assertion.value.callee as CodeModNode)?.object as CodeModNode,
      )
      const assertionTargetType: string = getAssertionTargetType(assertionTarget as CodeModNode)
      const assertionTargetExpression: string | CallExpression | CodeModNode | CodeModNode[] =
        getAssertionTargetExpression(j, assertionTarget)

      const hasCount: boolean =
        (assertionTarget as CodeModNode).callee &&
        hasProperty((assertionTarget as CodeModNode)?.callee as CodeModNode, 'count')
          ? true
          : false
      const hasNegative: boolean =
        ['toBeFalse', 'toBeFalsy'].includes(assertionType) ||
        hasProperty((assertion.value.callee as CodeModNode)?.object as CodeModNode, 'not') ||
        ((assertion.value?.arguments as CodeModNode[]).length > 0 &&
          (assertion.value?.arguments as CodeModNode[])[0].value === false)
      const transformedAssertion: string =
        assertionTargetType && (assertionTransforms as any)[assertionTargetType]
          ? (assertionTransforms as any)[assertionTargetType]
          : (assertionTransforms as any)[assertionType]

      // TODO: add error message if no transformedAssertion

      const fullyTransformedAssertion: string = hasNegative ? `not.${transformedAssertion}` : transformedAssertion

      const assertionArgs: StringLiteral[] = [j.stringLiteral(fullyTransformedAssertion)]

      // add arguments of literal types to assertion
      if (
        (assertion.value.arguments as CodeModNode[]).length > 0 &&
        typeof (assertion.value.arguments as CodeModNode[])[0].value !== 'boolean'
      ) {
        assertionArgs.push((assertion.value.arguments as any)[0] as StringLiteral)
      }

      j(assertion as ASTPath<ASTNode>).replaceWith((): string | CallExpression => {
        // transform assertion that includes count()
        if (hasCount) {
          const countAssertion: TypedElementInExpression = findElementInExpression(
            ((assertionTarget as CodeModNode).callee as CodeModNode)?.object as CodeModNode,
            'property',
          )
          let transformedCountSelector: CallExpression = {} as CallExpression

          if (cyGetLocators.includes((countAssertion as CyGetLocatorsObject).name)) {
            transformedCountSelector = replaceCySelector(
              j,
              ((assertionTarget as CodeModNode).callee as CodeModNode)?.object as CodeModNode,
              'get',
              (countAssertion as CyGetLocatorsObject).name,
            )
          }

          if ((cyContainLocators as any)[(countAssertion as CyGetLocatorsObject).name]) {
            transformedCountSelector = replaceCyContainsSelector(
              j,
              (countAssertion as ProtractorSelectorsObject).name,
              (cyContainLocators as any)[(countAssertion as ProtractorSelectorsObject).name],
              ((((assertionTarget as CodeModNode).callee as CodeModNode)?.object as CodeModNode)?.callee as CodeModNode)
                ?.arguments as CodeModNode[],
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
      if (((path.value.callee as CodeModNode)?.object as CodeModNode)?.callee as CodeModNode) {
        const propertyName = getPropertyName(
          ((path.value.callee as CodeModNode)?.object as CodeModNode)?.callee as CodeModNode,
        )

        if (propertyName && cyGetLocators.includes(propertyName as CyGetLocators)) {
          ;(path.value.callee as CodeModNode).object = replaceCySelector(
            j,
            (path.value.callee as CodeModNode)?.object as CodeModNode,
            'get',
            propertyName,
          ) as CodeModNode
        }
      }
    })
}
