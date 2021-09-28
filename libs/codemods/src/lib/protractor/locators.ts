import { JSCodeshift } from 'jscodeshift';
import {
  getPropertyName,
  isSelector,
  replaceCyContainsSelector,
  replaceCySelector,
} from '../utils';
import {
  cyContainLocators,
  CyGetLocators,
  cyGetLocators,
  supportedAssertionTypes,
  unsupportedLocators,
} from './constants';

export function handleCyGetTransform(
  j: JSCodeshift,
  path: any,
  propertyName: CyGetLocators
): any {
  // if $$ is after another expression, transform it into .find()
  // otherwise, transform $, $$, and by locators as documented
  if (propertyName === '$$' && path.value?.callee.object) {
    path.value.callee.property.name = 'find';
  } else {
    if (cyGetLocators.includes(propertyName)) {
      return j(path).replaceWith((path: any) => {
        return replaceCySelector(j, path.value, 'get', propertyName);
      });
    }
  }
}

// transform locators in cyContainLocators list
export function handleCyContainsTransform(
  j: JSCodeshift,
  path: any,
  propertyName: string
): any {
  const args = path.value ? path.value.arguments : path.arguments;
  if (propertyName in cyContainLocators) {
    return j(path).replaceWith(() => {
      return replaceCyContainsSelector(
        j,
        propertyName,
        cyContainLocators[propertyName],
        args
      );
    });
  }
}

// exclude non-locators and assertions from this group

export function transformLocators(j: JSCodeshift, nodes: any): any {
  return nodes
    .filter((path: any) => {
      return (
        path.value?.callee &&
        isSelector(path.value.callee) &&
        !supportedAssertionTypes.includes(path.value?.callee?.property?.name)
      );
    })
    .forEach((path: any) => {
      const { value } = path;
      const propertyName =
        value.callee.type === 'MemberExpression'
          ? getPropertyName(value.callee)
          : value.callee.name;

      // transform $$('item').get(1)
      if (
        propertyName === '$$' &&
        path.parentPath.value.property?.name === 'get'
      ) {
        path.parentPath.value.property.name = 'eq';
      }

      // transform locators in cyGetLocators list
      handleCyGetTransform(j, path, propertyName);

      // transform locators in cyContainLocators list
      handleCyContainsTransform(j, path, propertyName);

      if (unsupportedLocators.includes(propertyName)) {
        // const logMessage = `Cypress does not currently natively support selection by ${propertyName}.\nIf you think this is an error, please submit an issue or contribute via a PR.`;
        // console.log(errorMessage(logMessage, value, file));
      }
    });
}
