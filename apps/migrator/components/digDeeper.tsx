import Image from 'next/image';
import Link from 'next/link';
import { selectLanguage, useAppSelector } from '../app';
import { protractorDocsURL } from '../constants'

export default function DigDeeper() {
  const selectedLanguage = useAppSelector(selectLanguage)

    return (
      <>
        <div className="sm:flex sm:justify-center items-center bg-indigo-50 p-16 md:gap-24 xl:gap-60">
          <div className="text-center sm:text-left">
            <h3 className="mt-2 mb-4 lg:mb-8 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              Want to learn more?
            </h3>
            <p className="mt-3 text-base text-gray-600 lg:w-9/12">
                See our Migrating from <span className="capitalize">{selectedLanguage}</span> to Cypress Guide.
            </p>
            <Link href={protractorDocsURL}>
              <a rel="noreferrer" target="_blank" className="my-6 inline-block rounded-md bg-indigo-500 py-2 px-4 text-center text-sm text-gray-50 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 transition duration-300 ease-in-out transform hover:-translate-y-0 hover:scale-105">
                Migration Guide &rarr;{' '}
              </a>
            </Link>
          </div>
          <div className="hidden sm:flex justify-center border-solid border border-gray-200 rounded-md shadow cursor-pointer">
            <Link href={protractorDocsURL} passHref>
              <a className="flex" rel="noreferrer" target="_blank">
                <Image
                  src="/protractor-migration.png"
                  alt="View All Migrations"
                  width={550}
                  height={450}
                />
              </a>
            </Link> 
          </div>
        </div>
      </>
    )
  }
