import { ReactElement } from 'react'
import Image from 'next/image'
import logo from '../public/logo.png'

import { useAppSelector, selectLanguage } from '../app'

const Navigation = (): ReactElement => {
  const selectedLanguage: string = useAppSelector(selectLanguage)
  const navLinks = [{ title: 'Cypress Docs', url: 'https://docs.cypress.io' }]
  const migrationGuides = {
    protractor: { url: 'https://on.cypress.io/protractor-to-cypress' },
  }

  return (
    <nav className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 items-center">
      <div className="flex w-full justify-between items-center">
        <div className="flex-shrink-0 flex items-center">
          <Image src={logo} alt="Cypress Logo" width="50" height="50" />
          <span className="text-xl font-bold mx-2">Translator</span>
        </div>

        <ul className="nav-list ml-10 flex items-center space-x-4">
          {migrationGuides[selectedLanguage] && (
            <li key={migrationGuides[selectedLanguage]}>
              <a
                href={migrationGuides[selectedLanguage].url}
                className="dark:bg-gray-800 hover:underline bg-transparent dark:text-white px-3 py-2 rounded-md text-sm font-medium capitalize"
              >
                {`${selectedLanguage} Migration Guide`}
              </a>
            </li>
          )}
          {navLinks.map((link) => (
            <li key={link.title}>
              <a
                href={link.url}
                className="dark:bg-gray-00 hover:underline bg-transparent dark:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
