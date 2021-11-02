import { namedTypes } from 'ast-types'
import { Printable } from 'jscodeshift'
import { CodemodConstantTypes, CyContainLocatorsKeys, CyGetLocators, ProtractorSelectors } from './protractor/constants'

export type ExpressionKind =
  | namedTypes.Identifier
  | namedTypes.FunctionExpression
  | namedTypes.ThisExpression
  | namedTypes.ArrayExpression
  | namedTypes.ObjectExpression
  | namedTypes.Literal
  | namedTypes.SequenceExpression
  | namedTypes.UnaryExpression
  | namedTypes.BinaryExpression
  | namedTypes.AssignmentExpression
  | namedTypes.MemberExpression
  | namedTypes.UpdateExpression
  | namedTypes.LogicalExpression
  | namedTypes.ConditionalExpression
  | namedTypes.NewExpression
  | namedTypes.CallExpression
  | namedTypes.ArrowFunctionExpression
  | namedTypes.YieldExpression
  | namedTypes.GeneratorExpression
  | namedTypes.ComprehensionExpression
  | namedTypes.ClassExpression
  | namedTypes.Super
  | namedTypes.TaggedTemplateExpression
  | namedTypes.TemplateLiteral
  | namedTypes.MetaProperty
  | namedTypes.AwaitExpression
  | namedTypes.OptionalCallExpression
  | namedTypes.OptionalMemberExpression
  | namedTypes.JSXIdentifier
  | namedTypes.JSXExpressionContainer
  | namedTypes.JSXElement
  | namedTypes.JSXFragment
  | namedTypes.JSXMemberExpression
  | namedTypes.JSXText
  | namedTypes.PrivateName
  | namedTypes.TypeCastExpression
  | namedTypes.DoExpression
  | namedTypes.BindExpression
  | namedTypes.ParenthesizedExpression
  | namedTypes.DirectiveLiteral
  | namedTypes.StringLiteral
  | namedTypes.NumericLiteral
  | namedTypes.BigIntLiteral
  | namedTypes.NullLiteral
  | namedTypes.BooleanLiteral
  | namedTypes.RegExpLiteral
  | namedTypes.Import
  | namedTypes.TSAsExpression
  | namedTypes.TSNonNullExpression
  | namedTypes.TSTypeParameter
  | namedTypes.TSTypeAssertion
export type StringLiteral = namedTypes.StringLiteral

export type ReplacementValues = { [key: string]: string }

export type CodemodConstantTypesObject = { [key: string]: CodemodConstantTypes }

export type ProtractorSelectorsObject = { name: ProtractorSelectors }
export type CyGetLocatorsObject = { name: CyGetLocators }

export type Selector = {
  object?: CodemodConstantTypesObject
  property?: CodemodConstantTypesObject
  name?: ProtractorSelectors
}

export type CodeModNodeKeys =
  | 'type'
  | 'arguments'
  | 'object'
  | 'callee'
  | 'property'
  | 'name'
  | 'source'
  | 'left'
  | 'value'

export type CodeModNode = {
  type?: 'Identifier' | 'MemberExpression' | 'CallExpression' | 'BooleanLiteral'
  arguments?: CodeModNode | CodeModNode[]
  object?: CodeModNode
  callee?: CodeModNode
  property?: CodeModNode
  name?: string
  source?: {
    value: string
  }
  left?: CodeModNode
  value?: CodeModNode
}

export type TypedElementInExpression = CodemodConstantTypesObject | Printable
