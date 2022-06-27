import Image from 'next/image';
import Link from 'next/link';
import { selectLanguage, useAppSelector } from '../app';

export default function DigDeeper() {
  const selectedLanguage = useAppSelector(selectLanguage)

    return (
      <>
        <div className="grid gap-8 bg-indigo-50 p-8 lg:grid-cols-2 lg:px-16">
          {/* Column 1 */}
          <div className="mx-auto flex flex-col justify-center lg:w-6/12">
            <h3 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Want to learn more?
            </h3>
            <p className="mt-3 text-base text-gray-600 lg:w-9/12">
                See our Migrating from Protractor to Cypress Guide.
            </p>
  
            <Link href="/migrations">
              <a className="mt-12 inline-block rounded-md bg-indigo-500 py-2 px-4 text-center text-base text-gray-50 lg:w-6/12">
                Migratrion Guide &rarr;{' '}
              </a>
            </Link>
          </div>
  
          {/* Column 2 */}
          <div className="flex w-full flex-col justify-center">
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
