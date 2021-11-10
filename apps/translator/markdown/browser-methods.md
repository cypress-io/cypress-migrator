## Browser methods

| Before                                              | After                           |
| --------------------------------------------------- | ------------------------------- |
| browser.wait(5000)                                  | cy.wait(5000)                   |
| browser.getTitle()                                  | cy.title()                      |
| browser.getCurrentUrl()                             | cy.location('href')             |
| browser.setLocation('faq')                          | cy.get('#faq').scrollIntoView() |
| browser.refresh()                                   | cy.reload()                     |
| browser.debugger()                                  | cy.debug()                      |
| browser.findElement(by.css('.list'))                | cy.get('.list')                 |
| browser.driver.findElement(by.css('.another-list')) | cy.get('.another-list')         |
| browser.restart()                                   | _Removed from file._            |
| browser.restartSync()                               | _Removed from file._            |
| browser.ignoreSynchronization = true                | _Removed from file._            |
| browser.manage().timeouts().implicitlyWait(15000)   | _Removed from file._            |
| browser.waitForAngular()                            | _Removed from file._            |
| browser.waitForAngularEnabled()                     | _Removed from file._            |
| browser.pause()                                     | _Removed from file._            |
| browser.getId()                                     | _Removed from file._            |
