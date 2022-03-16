/**
    Copyright 2022 Google LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
 */

import { selectors } from '@cypress-dx/markdown'
import { LineWriter, Schema, StringifyExtension } from '@puppeteer/replay'

import { RecorderChangeTypes, recorderChangeTypes } from './constants'

export class CypressStringifyExtension extends StringifyExtension {
  async beforeAllSteps(out: LineWriter, flow: Schema.UserFlow): Promise<void> {
    console.log(
      '🚀 ~ file: CypressStringifyExtension.ts ~ line 23 ~ CypressStringifyExtension ~ beforeAllSteps ~ flow',
      flow,
    )
    out.appendLine(`describe(${flow.title}, function() {`)
    out.appendLine(`  it(tests ${flow.title}, function() {`).startBlock()
  }

  async afterAllSteps(out: LineWriter): Promise<void> {
    out.appendLine('  });').endBlock()
    out.appendLine('});')
  }

  async stringifyStep(out: LineWriter, step: Schema.Step): Promise<void> {
    this.#appendStepType(out, step)

    if (step.assertedEvents) {
      // TODO: handle assertions
    }
  }

  #appendStepType(out: LineWriter, step: Schema.Step): void {
    switch (step.type) {
      case 'click':
        return this.#appendClickStep(out, step)
      case 'change':
        return this.#appendChangeStep(out, step)
      case 'setViewport':
        return this.#appendViewportStep(out, step)
      case 'scroll':
        return this.#appendScrollStep(out, step)
      case 'navigate':
        return this.#appendNavigationStep(out, step)
      //   case 'customStep':
      //     return; // TODO: implement these
      //   default:
      //     return assertAllStepTypesAreHandled(step);
    }
  }

  #appendChangeStep(out: LineWriter, step: Schema.ChangeStep): void {
    console.log(
      '🚀 ~ file: CypressStringifyExtension.ts ~ line 85 ~ CypressStringifyExtension ~ #appendChangeStep ~ step',
      step,
    )
    // Handle text entry and form elements that update.
    handleChangeStep(out, step)
  }

  #appendClickStep(out: LineWriter, step: Schema.ClickStep): void {
    const cySelector = handleSelectors(step.selectors)

    if (cySelector) {
      out.appendLine(`${cySelector}.click();`)
    } else {
      out.appendLine(' // TODO')
    }

    out.appendLine('')
  }

  #appendNavigationStep(out: LineWriter, step: Schema.NavigateStep): void {
    out.appendLine(`cy.visit(${formatAsJSLiteral(step.url)}));`)
    out.appendLine('')
  }

  #appendScrollStep(out: LineWriter, step: Schema.ScrollStep): void {
    if ('selectors' in step) {
      out.appendLine(`${handleSelectors(step.selectors)}.scrollTo(${step.x}, ${step.y});`)
    } else {
      out.appendLine(`cy.scrollTo(${step.x}, ${step.y});`)
    }
    out.appendLine('')
  }

  #appendViewportStep(out: LineWriter, step: Schema.SetViewportStep): void {
    out.appendLine(`cy.viewport(${step.width}, ${step.height})`)
    out.appendLine('')
  }
}

function formatAsJSLiteral(value: string) {
  return JSON.stringify(value)
}

function handleSelectors(selectors: Schema.Selector[]): string | undefined {
  const firstSelector = selectors[0][0]

  if (!firstSelector) {
    return
  }

  if (firstSelector.includes('aria/')) {
    const ariaContent = firstSelector.split('aria/')[1]

    return `cy.contains(${formatAsJSLiteral(ariaContent)}')`
  } else {
    return `cy.get(${formatAsJSLiteral(firstSelector)})`
  }
}

function handleChangeStep(out: LineWriter, step: Schema.ChangeStep): string {
  console.log('🚀 ~ file: CypressStringifyExtension.ts ~ line 130 ~ handleChangeStep ~ step', step)
  const stepSelectors = step.selectors

  const findChangeElement = stepSelectors.find((selector) =>
    recorderChangeTypes.includes(selector as RecorderChangeTypes),
  )
  console.log(
    '🚀 ~ file: CypressStringifyExtension.ts ~ line 132 ~ handleChangeStep ~ findChangeElement',
    findChangeElement,
  )

  // stepSelectors.map((selector) => {})
  return ''
}
