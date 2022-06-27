import Image from 'next/image';
import Link from 'next/link';
import { selectLanguage, useAppSelector } from '../app';

export default function DigDeeper() {
  const selectedLanguage = useAppSelector(selectLanguage)

    return (
      <>
        <div className="sm:flex sm:justify-center items-center bg-indigo-50 py-8 px-16 md:gap-24 xl:gap-60">
          {/* Column 1 */}
          <div className="text-center sm:text-left">
            <h3 className="mt-2 mb-4 lg:mb-8 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              Want to learn more?
            </h3>
            <p className="mt-3 text-base text-gray-600 lg:w-9/12">
                See our Migrating from Protractor to Cypress Guide.
            </p>
  
            <Link href="https://docs.cypress.io/guides/end-to-end-testing/protractor-to-cypress">
              <a className="my-6 inline-block rounded-md bg-indigo-500 py-2 px-4 text-center text-base text-gray-50 lg:w-6/12">
                Migratrion Guide &rarr;{' '}
              </a>
            </Link>
          </div>
  
          {/* Column 2 */}
          <div className="flex justify-center">
            <Image
              src="/real-world-app.svg"
              alt="View All Migrations"
              width={600}
              height={400}
            />
          </div>
        </div>
      </>
    )
  }
