import { ElementArrayFinder, ElementFinder, promise, element, by, $ } from 'protractor'

export class TestPageObject {
  private testPrivateMethod(): ElementArrayFinder {
    return element(by.className('private-class'))
  }

  protected testProtectedMethod(): ElementArrayFinder {
    return element(by.className('protected-class'))
  }

  async getPage(): Promise<void> {
    await browser.get('http://www.angularjs.org')
  }

  async search(term: string): Promise<void> {
    const input = element(by.name('search-input'))
    await input.clear()
    await input.sendKeys(term)
    await element(by.id('submit-search')).click()
  }

  public testClassName(): ElementArrayFinder {
    return element(by.className('test-class'))
  }

  testId(): promise.Promise<string> {
    return element(by.id('test-id'))
  }

  testTagName(): promise.Promise<string> {
    return element(by.tagName('h1'))
  }

  testDollarSign(): promise.Promise<string> {
    return $('test-element')
  }

  testName(): promise.Promise<string> {
    return element(by.name('field-name'))
  }

  testElementAll(): promise.Promise<string> {
    return element.all(by.className('test-class'))
  }
}