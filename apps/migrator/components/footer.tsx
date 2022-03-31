const navigation = {
  main: [
    { name: "Docs", href: "https://docs.cypress.io/" },
    {
      name: "Real World App",
      href: "https://github.com/cypress-io/cypress-realworld-app",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/channel/UC-EOsTo2l2x39e4JmSaWNRQ",
    },
    {
      name: "Discord",
      href: "https://discord.gg/cMjUZg7",
    },
    {
      name: "GitHub",
      href: "https://github.com/cypress-io/cypress-realworld-testing",
    },
  ],
}

export default function Footer() {
  return (
    <>
      <hr />
      <footer className="bg-indigo-500 p-4 md:p-0">
        <hr />

        <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
          <nav
            className="-mx-5 -my-2 flex flex-wrap justify-center"
            aria-label="Footer"
          >
            {navigation.main.map((item) => (
              <div key={item.name} className="px-5 py-2">
                <a
                  href={item.href}
                  className="text-base text-gray-50 hover:text-gray-900"
                >
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <p className="mt-8 text-center text-base text-gray-50">
            &copy; {`${new Date().getFullYear()}`} Cypress. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}