import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import {
  INavigationLinkItemProps,
  INavigationLinks,
  ISocialMediaNavigationLink,
} from '../types/components/navbar'
import socialMediaNavigationLinks from '../data/socialMediaNavigationLinks'
import navigationLinks from '../data/navigationLinks'
import SocialMediaNavigationLinkItem from './SocialMediaNavigationLinkItem'

const NavigationLinkItem = ({
  name,
  path,
  className,
}: INavigationLinkItemProps) => {
  return (
    <li className={className}>
      <Link to={path}>{name}</Link>
    </li>
  )
}

const Navbar: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const location = useLocation()

  /* Adding the smooth scroll if location routes location changes. */
  useEffect(() => {
    const hash = location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location])

  return (
    <header className='w-full flex justify-center'>
      <nav
        className='overflow-y-hidden fixed flex justify-between items-center bg-background 
        h-[10vh] w-full px-6 xl:px-28 2xl:px-96 z-50  backdrop-filter
        backdrop-blur-lg bg-opacity-50'
      >
        <Link to='/#home'>
          <img
            className='w-10 fill-white'
            src='/assets/logo.svg'
            alt='sdk-logo'
          />
        </Link>
        <ul className='md:flex justify-between hidden text-sm font-bold text-foreground uppercase'>
          {navigationLinks.map(({ id, name, path }: INavigationLinks) => {
            return (
              <NavigationLinkItem
                key={id}
                name={name}
                path={path}
                className='border-b-4 border-transparent hover:border-primary px-4 py-2'
              />
            )
          })}
        </ul>
        <div
          className='block md:hidden cursor-pointer text-3xl font-extrabold z-1 text-foreground'
          onClick={() => setOpen(!isOpen)}
        >
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </nav>
      <nav
        className={` fixed flex md:hidden flex-col justify-between bg-background 
        top-[10vh] h-[90vh] p-10 pb-24 pt-20 z-40 w-[75vw] ease-in-out backdrop-filter 
        backdrop-blur-lg bg-opacity-50 duration-500 ${
          isOpen ? 'right-0' : 'right-[-100vw]'
        } `}
        onClick={() => setOpen(!isOpen)}
      >
        <ul className='flex flex-col items-center uppercase text-xl text-foreground '>
          {navigationLinks.map(({ id, name, path }: INavigationLinks) => {
            return (
              <NavigationLinkItem
                key={id}
                name={name}
                path={path}
                className='hover:text-primary px-20 py-5'
              />
            )
          })}
        </ul>
        <ul className='flex text-3xl justify-around w-full items-center text-foreground'>
          {socialMediaNavigationLinks.map(
            ({ id, path, socialMediaIcon }: ISocialMediaNavigationLink) => {
              return (
                <SocialMediaNavigationLinkItem
                  key={id}
                  path={path}
                  socialMediaIcon={socialMediaIcon}
                  className='hover:text-primary p-4'
                />
              )
            }
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
