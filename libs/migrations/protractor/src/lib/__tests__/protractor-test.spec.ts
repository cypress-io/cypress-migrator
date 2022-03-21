/* eslint-disable @typescript-eslint/no-var-requires */
// const defineTest = require('jscodeshift/dist/testUtils').defineTest;
// const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;
// const transform = require('../index.ts');

import * as jscodeshiftTestUtils from 'jscodeshift/dist/testUtils'
import * as transform from '../transformer'
import { assertionsInput, assertionsOutput } from '../__testfixtures__/assertions'
import { browserMethodsInput, browserMethodsOutput } from '../__testfixtures__/browser-methods';
import { elementLocatorsInput, elementLocatorsOutput } from '../__testfixtures__/element-locators';
import { elementInteractionsInput, elementInteractionsOutput } from '../__testfixtures__/element-interactions';
import { exampleInput, exampleOutput } from '../__testfixtures__/example';

describe('protractor', () => {
  // test removing protractor imports codemod
  jscodeshiftTestUtils.defineInlineTest(
    transform,
    {},
    browserMethodsInput,
    browserMethodsOutput,
    'migrate browser methods',
  )

  jscodeshiftTestUtils.defineInlineTest(
    transform,
    {},
    assertionsInput,
    assertionsOutput,
    'migrate assertions methods'
  )

  jscodeshiftTestUtils.defineInlineTest(
    transform,
    {},
    elementLocatorsInput,
    elementLocatorsOutput,
    'migrate element locators'
  )

  jscodeshiftTestUtils.defineInlineTest(
    transform,
    {},
    elementInteractionsInput,
    elementInteractionsOutput,
    'migrate element interactions'
  )
  
  jscodeshiftTestUtils.defineInlineTest(
    transform,
    {},
    exampleInput,
    exampleOutput,
    'migrate examples'
  )
})
