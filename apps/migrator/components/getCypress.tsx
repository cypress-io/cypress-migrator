import Image from 'next/image'
import { NPMCopy } from '../components'

export default function GetCypress() {
  return (
    <section className="flex flex-col items-center justify-center mt-20">
      <p className="lg:text-4xl sm:text-3xl font-semibold">Test your code, not your patience.</p>
      <div className="flex flex-row space-x-4 pt-8 pb-12">
        <NPMCopy />
        <a
            href='https://download.cypress.io/desktop'
            className="w-full sm:w-auto sm:max-w-1/2 inline-flex justify-center items-center px-6 py-3 my-4 text-base font-medium rounded-md shadow-sm text-indigo-500 bg-indigo-50 transition duration-300 ease-in-out transform hover:-translate-y-0 hover:scale-105"
            >
              Download Now
        </a>
      </div>
      <Image src="/cypress_app.svg" alt="Cypress App" width="1200" height="274" />
    </section>
  )
}
