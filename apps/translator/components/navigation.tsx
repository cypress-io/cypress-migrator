import { ReactElement } from "react"
import Image from "next/image"
import { navigation } from "../constants"
import logo from "../public/logo.png";

const Navigation = (): ReactElement => {
  return (
    <nav className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 items-center">
      <div className="flex w-full justify-between items-center">
        <div className="flex-shrink-0 flex items-center">
          <Image src={logo} alt="Cypress Logo" width="50" height="50" />
          <span className="text-xl font-bold mx-2">Translator</span>
        </div>

        <ul className="nav-list ml-10 flex items-center space-x-4">
          {navigation.map((item, itemIdx) =>
            itemIdx === 0 ? (
              <li key={item.title}>
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <a
                  href={item.url}
                  className="dark:bg-gray-800 bg-transparent dark:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.title}
                </a>
              </li>
            ) : (
              <a
                key={item.title}
                href={item.url}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.title}
              </a>
            )
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
