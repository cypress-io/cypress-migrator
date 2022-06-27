import Image from 'next/image'
import { ReactElement } from 'react'

const GetCypress = (): ReactElement => {
  return (
    <section className="flex flex-col items-center justify-center md:mt-20 mt-10">
      <h2 className="text-gray-900 lg:text-4xl lg:mb-0 md:text-3xl md:mb-0 sm:text-2xl mb-5 font-semibold">Test your code, not your patience.</h2>
      <div className="flex flex-row gap-4 pt-8 pb-12">

      </div>
      <Image src="/cypress_app.svg" alt="Cypress App" width="1200" height="274" />
    </section>
  )
}
export default GetCypress
