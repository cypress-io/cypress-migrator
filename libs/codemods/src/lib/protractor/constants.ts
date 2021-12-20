export type CodemodConstantTypes =
  | ProtractorSelectors
  | CyGetLocators
  | CyContainLocatorsKeys
  | CyContainLocatorsValues
  | CyContainLocators
  | UnsupportedLocators
  | NonLocatorMethodTransformsKeys
  | NonLocatorMethodTransformsValues
  | NonLocatorMethodTransforms
  | SupportedBrowserMethods
  | BrowserMethodTransformsKeys
  | BrowserMethodTransformsValues
  | BrowserMethodTransforms
  | UnsupportedBrowserMethods
  | SupportedAssertionTypes
  | AssertionTransformsKeys
  | AssertionTransformsValues
  | AssertionTransforms

export type ProtractorSelectors = 'by' | 'By' | '$' | '$$'
export const protractorSelectors: ProtractorSelectors[] = ['by', 'By', '$', '$$']

// protractor locators that resolve to cy.get
export type CyGetLocators =
  | 'className'
  | 'css'
  | 'id'
  | 'name'
  | 'tagName'
  | '$'
  | 'model'
  | 'binding'
  | '$$'
  | 'options'
export const cyGetLocators: CyGetLocators[] = [
  'className',
  'css',
  'id',
  'name',
  'tagName',
  '$',
  'model',
  'binding',
  '$$',
  'options',
]

// protractor locators that resolve to cy.contains
export type CyContainLocatorsKeys =
  | 'buttonText'
  | 'partialButtonText'
  | 'linkText'
  | 'partialLinkText'
  | 'cssContainingText'
export type CyContainLocatorsValues = 'button' | 'a' | ''
export type CyContainLocators = {
  [key in CyContainLocatorsKeys]: CyContainLocatorsValues
}
export const cyContainLocators: CyContainLocators = {
  buttonText: 'button',
  partialButtonText: 'button',
  linkText: 'a',
  partialLinkText: 'a',
  cssContainingText: '',
}

export type UnsupportedLocators = 'xpath'
export const unsupportedLocators: UnsupportedLocators[] = ['xpath']

// protractor browser methods and their cy equivalents
export type NonLocatorMethodTransformsKeys = 'takeScreenshot' | 'getDriver' | 'sendKeys'
export type NonLocatorMethodTransformsValues = 'screenshot' | 'parent' | 'type'
export type NonLocatorMethodTransforms = {
  [key in NonLocatorMethodTransformsKeys]: NonLocatorMethodTransformsValues
}
export const nonLocatorMethodTransforms: NonLocatorMethodTransforms = {
  takeScreenshot: 'screenshot',
  getDriver: 'parent',
  sendKeys: 'type',
}

export type SupportedBrowserMethods =
  | 'get'
  | 'wait'
  | 'refresh'
  | 'getTitle'
  | 'actions'
  | 'perform'
  | 'doubleClick'
  | 'mouseMove'
  | 'setLocation'
  | 'wait'
  | 'perform'
  | 'getCurrentUrl'
  | 'debugger'
  | 'findElement'
export const supportedBrowserMethods: SupportedBrowserMethods[] = [
  'get',
  'wait',
  'refresh',
  'getTitle',
  'actions',
  'perform',
  'doubleClick',
  'mouseMove',
  'setLocation',
  'wait',
  'perform',
  'getCurrentUrl',
  'debugger',
  'findElement',
]

// protractor browser methods and their cy equivalents
export type BrowserMethodTransformsKeys =
  | 'get'
  | 'refresh'
  | 'getTitle'
  | 'doubleClick'
  | 'mouseMove'
  | 'setLocation'
  | 'setLocation'
  | 'debugger'
  | 'findElement'
export type BrowserMethodTransformsValues =
  | 'visit'
  | 'reload'
  | 'title'
  | 'dblclick'
  | 'scrollIntoView'
  | 'get'
  | 'debug'
export type BrowserMethodTransforms = {
  [key in BrowserMethodTransformsKeys]: BrowserMethodTransformsValues
}
export const browserMethodTransforms: BrowserMethodTransforms = {
  get: 'visit',
  refresh: 'reload',
  getTitle: 'title',
  doubleClick: 'dblclick',
  mouseMove: 'scrollIntoView',
  setLocation: 'get',
  debugger: 'debug',
  findElement: 'get',
}

export type UnsupportedBrowserMethods =
  | 'restart'
  | 'restartSync'
  | 'waitForAngular'
  | 'waitForAngularEnabled'
  | 'setScriptTimeout'
  | 'pause'
  | 'getId'
export const unsupportedBrowserMethods: UnsupportedBrowserMethods[] = [
  'restart',
  'restartSync',
  'waitForAngular',
  'waitForAngularEnabled',
  'setScriptTimeout',
  'pause',
  'getId',
]

export type SupportedAssertionTypes = 'toBe' | 'toEqual' | 'toBeTrue' | 'toBeFalse' | 'toBeTruthy' | 'toBeFalsy'
export const supportedAssertionTypes: SupportedAssertionTypes[] = [
  'toBe',
  'toEqual',
  'toBeTrue',
  'toBeFalse',
  'toBeTruthy',
  'toBeFalsy',
]

// jasmine matchers to transform
export type AssertionTransformsKeys =
  | 'toBe'
  | 'toEqual'
  | 'getText'
  | 'isDisplayed'
  | 'isPresent'
  | 'isSelected'
  | 'isEnabled'
export type AssertionTransformsValues =
  | 'deepEqual'
  | 'equal'
  | 'have.text'
  | 'be.visible'
  | 'exist'
  | 'be.selected'
  | 'be.enabled'
export type AssertionTransforms = {
  [key in AssertionTransformsKeys]: AssertionTransformsValues
}
export const assertionTransforms: AssertionTransforms = {
  toBe: 'deepEqual',
  toEqual: 'equal',
  getText: 'have.text',
  isDisplayed: 'be.visible',
  isPresent: 'exist',
  isSelected: 'be.selected',
  isEnabled: 'be.enabled',
}

export type BrowserSelectors = 'browser' | 'driver'
export const browserSelectors: BrowserSelectors[] = [ 'browser', 'driver']
