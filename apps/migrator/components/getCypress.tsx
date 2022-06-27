import Image from 'next/image'
import { ReactElement, useState, useEffect } from 'react'
import { NPMCopy } from '../components'

const GetCypress = (): ReactElement => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    window.addEventListener('load', () => setIsMobile(window.innerWidth <= 768))
    window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 768))
  }, [])

  return (
    <section className="flex flex-col items-center justify-center md:mt-20 mt-10">
      <h2 className="text-gray-900 lg:text-4xl lg:mb-0 md:text-3xl md:mb-0 sm:text-2xl mb-5 font-semibold">Test your code, not your patience.</h2>
      {!isMobile ? (
      <div className="flex flex-row gap-4 pt-8 pb-12">
        <NPMCopy />
        <a
            href='https://download.cypress.io/desktop'
            className="w-full sm:w-auto sm:max-w-1/2 inline-flex justify-center items-center px-6 py-3 my-4 text-base font-medium rounded-md shadow-sm text-indigo-500 bg-indigo-50 transition duration-300 ease-in-out transform hover:-translate-y-0 hover:scale-105"
            >
              Download Now
        </a>
      </div>) : null}
      <Image src="/cypress_app.svg" alt="Cypress App" width="1200" height="274" />
    </section>
  )
}
export default GetCypress