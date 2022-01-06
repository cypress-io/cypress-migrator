import { forwardRef, MouseEventHandler } from 'react'
import Image from 'next/image'

interface Props {
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

const Logo = forwardRef<HTMLAnchorElement, Props>(({ href, onClick }, ref) => (
  <a className="flex-shrink-0 flex items-center" href={href} onClick={onClick} ref={ref}>
    <Image src="/logo.png" alt="Cypress Logo" width="50" height="50" />
    <span className="text-xl font-bold mx-2">Migrator</span>
  </a>
))

export default Logo
