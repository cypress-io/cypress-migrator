import { ReactElement } from 'react'
import Link from 'next/link'

import { useAppSelector, selectLanguage } from '../app'
import { Logo } from '../components'

const Navigation = (): ReactElement => {
  const selectedLanguage: string = useAppSelector(selectLanguage).toLowerCase()
  const navLinks = [{ title: 'Cypress Docs', url: 'https://on.cypress.io/docs' }]
  const migrationGuides = {
    protractor: { url: 'https://on.cypress.io/protractor-to-cypress' },
  }

  return (
    <>
      <nav className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 items-center">
        <div className="flex w-full justify-between items-center">
          <Link href="/" passHref>
            <Logo />
          </Link>

          <ul
            className="nav-list flex items-center sm:space-x-3 md:space-x-4 lg:space-x-8 leading-3 px-2"
            data-test="nav-list"
          >
            {migrationGuides[selectedLanguage] && (
              <li key={migrationGuides[selectedLanguage]}>
                <a
                  href={migrationGuides[selectedLanguage].url}
                  className="text-jade-700 py-2 rounded-md text-xs sm:text-sm font-medium capitalize"
                >
                  {`${selectedLanguage} Migration Guide`}
                </a>
              </li>
            )}
            {navLinks.map((link) => (
              <li key={link.title}>
                <a
                  href={link.url}
                  className="text-jade-700 py-2 rounded-md text-xs sm:text-sm font-medium"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <hr />
    </>
  )
}

export default Navigation
