import { ReactElement } from 'react'
import Link from 'next/link'

import { useAppSelector, selectLanguage } from '../app'
import { Logo } from '../components'
import { protractorDocsURL, cypressDocsURL } from '../constants'

const Navigation = (): ReactElement => {
  const selectedLanguage: string = useAppSelector(selectLanguage).toLowerCase()
  const navLinks = [{ title: 'Cypress Docs', url: cypressDocsURL }]
  const migrationGuides = {
    protractor: { url: protractorDocsURL },
  }

  return (
    <nav className="bg-white bg-opacity-50 shadow">
      <div className="flex w-full justify-between max-w-screen-2xl mx-auto px-6 sm:px-6 lg:px-8 h-16 items-center">
        <Link href="/" passHref>
          <Logo />
        </Link>
        <ul
          className="nav-list flex items-center gap-1.5 sm:gap-3 md:gap-6 leading-3 px-2"
          data-test="nav-list"
        >
          {migrationGuides[selectedLanguage] && (
            <li key={migrationGuides[selectedLanguage]}>
              <a
                rel="noreferrer"
                href={migrationGuides[selectedLanguage].url}
                target="_blank"      
                className="dark:bg-gray-800 hover:underline bg-transparent dark:text-white py-2 rounded-md text-xs sm:text-base font-normal capitalize text-gray-600"
              >
                {`${selectedLanguage} Migration Guide`}
              </a>
            </li>
          )}
          {navLinks.map((link) => (
            <li key={link.title}>
              <a
                rel="noreferrer"
                href={link.url}
                target="_blank"
                className="dark:bg-gray-00 hover:underline bg-transparent dark:text-white py-2 rounded-md text-xs sm:text-base font-normal text-gray-600"
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
