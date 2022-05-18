import { ReactElement } from 'react'

const footerData = {
  primary: [
    {
      heading: "Getting Started",
      links: [
        {
          text: "Why Cypress",
          href: "https://on.cypress.io/why-cypress",
        },
        {
          text: "Installing Cypress",
          href: "https://on.cypress.io/installing-cypress",
        },
        {
          text: "Write your first test",
          href: "https://on.cypress.io/writing-your-first-test",
        },
        {
          text: "Testing your app",
          href: "https://on.cypress.io/testing-your-app",
        }
      ]
    },
    {
      heading: "Developers",
      links: [
        {
          text: "Documentation",
          href: "https://docs.cypress.io",
        },
        {
          text: "Changelog",
          href: "https://on.cypress.io/changelog",
        },
        {
          text: "Status site",
          href: "https://www.cypressstatus.com",
        },
        {
          text: "Contribute",
          href: "https://on.cypress.io/contributing",
        },
        {
          text: "Learn Cypress",
          href: "https://learn.cypress.io",
        }
      ]
    },
    {
      heading: "Community",
      links: [
        {
          text: "Blog",
          href: "https://www.cypress.io/blog",
        },
        {
          text: "Events",
          href: "https://www.cypress.io/events",
        },
        {
          text: "Testimonials",
          href: "https://www.cypress.io/testimonials",
        },
        {
          text: "Ambassadors",
          href: "https://www.cypress.io/ambassadors",
        },
        {
          text: "What's New",
          href: "https://www.cypress.io/whats-new",
        }
      ]
    },
    {
      heading: "Company",
      links: [
        {
          text: "About",
          href: "https://www.cypress.io/about",
        },
        {
          text: "Careers",
          href: "https://www.cypress.io/careers",
        },
        {
          text: "Case Studies",
          href: "https://www.cypress.io/case-studies",
        },
        {
          text: "Support",
          href: "https://www.cypress.io/support",
        },
        {
          text: "Contact Us",
          href: "/contact-us",
        }
      ]
    }
  ],
  secondary: [
    {
      text: "Privacy policy",
      href: "https://www.cypress.io/privacy-policy",
    },
    {
      text: "Terms of Service",
      href: "https://www.cypress.io/terms-of-use",
    },
    {
      text: "Security & Compliance",
      href: "https://www.cypress.io/security",
    }
  ]
}


const Footer = (): ReactElement => {
  return (
    <>
      <footer className="bg-indigo-500 px-16 pt-14 pb-4 md:p-0">
        <section className="max-w-7xl h-full mx-auto py-6 border-b border-indigo-400">
          <nav className="flex flex-row justify-between">
            {footerData.primary.map(({ heading, links }) => (
            <div className="" key={heading}>
              <p className="text-gray-50 text-sm font-medium mb-3">{heading}</p>
              <ul className="space-y-2">
                {links.map(({href, text}) => (
                <li className="text-indigo-200 hover:text-white text-sm font-light" key={text}>
                  <a href={href} target={`_blank`}>{text}</a>
                </li>
                ))}
              </ul>
            </div>
            ))}
          <div className="max-w-sm">
            <h1 className="text-gray-50 text-sm font-medium mb-3">Stay in the loop</h1>
            <p className="text-indigo-200 text-sm font-light mb-6">Sign up to our newsletter for monthly updates on product releases, news, and articles direct to your inbox.</p>
              <form className="flex">
                <input type="email" placeholder="Enter your email" name="email" className="px-3 h-10 w-64 text-sm"></input>
                <button type="button" className="text-indigo-900 bg-indigo-100 hover:text-indigo-500 rounded-r px-0.5 w-28">Subscribe</button>
              </form>
            </div>
          </nav>
        </section>
        <section className="flex flex-row text-indigo-200 text-sm font-light pb-20 pt-4 max-w-7xl h-full mx-auto">
          <nav>
            <ul className="flex flex-row space-x-6">
              <li className="hover:text-white">© Cypress.io</li>
              {footerData.secondary.map(({href, text}) => (
              <li className="hover:text-white" key={text}>
                <a href={href} target={`_blank`}>{text}</a>
              </li>
              ))}
            </ul>
          </nav>
        </section>
      </footer>
    </>
  )
}

export default Footer
