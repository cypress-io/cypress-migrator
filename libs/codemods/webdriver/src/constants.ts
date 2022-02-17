// webdriver element methods and their cy equivalents
export type ElementMethodTransformsKeys = 'clearValue'
export type ElementMethodTransformsValues = 'clear'
export type ElementMethodTransforms = {
  [key in ElementMethodTransformsKeys]: ElementMethodTransformsValues
}
export const elementMethodTransforms: ElementMethodTransforms = {
  clearValue: 'clear',
}
