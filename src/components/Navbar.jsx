import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react'
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from 'react-icons/ai'
import { HiMail } from 'react-icons/hi'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <header className='w-full flex justify-center'>
      <div className='overflow-y-hidden fixed flex justify-between items-center bg-background 
        h-[10vh] w-full px-6 xl:px-28 2xl:px-96 z-50  backdrop-filter
        backdrop-blur-lg bg-opacity-50'>
        <Link to='/#home'>
          <img className='w-10 fill-white' src='assets/logo.svg' alt='sdk-logo' />
        </Link>
        <ul className='md:flex justify-between hidden text-sm font-bold text-foreground uppercase'>
          <li className='border-b-4 border-transparent hover:border-primary px-4 py-2'><Link to='/#home'>Home</Link></li>
          <li className='border-b-4 border-transparent hover:border-primary px-4 py-2'><Link to='/#about'>About</Link></li>
          <li className='border-b-4 border-transparent hover:border-primary px-4 py-2'><Link to='/blog#main'>Blog</Link></li>
          <li className='border-b-4 border-transparent hover:border-primary px-4 py-2'><Link to='/#contact'>Contact</Link></li>
        </ul>
        <div className='block md:hidden cursor-pointer text-3xl font-extrabold z-1 text-foreground'
          onClick={() => setOpen(!isOpen)}
        >
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>
      <div className={` fixed flex md:hidden flex-col justify-between bg-background 
        top-[10vh] h-[90vh] p-10 pb-24 pt-20 z-40 w-[75vw] ease-in-out backdrop-filter 
        backdrop-blur-lg bg-opacity-50 duration-500 ${isOpen ? 'right-0' : 'right-[-100vw]'} `}
        onClick={() => setOpen(!isOpen)}
      >
        <ul className='flex flex-col items-center uppercase text-xl text-foreground '>
          <li className='hover:text-primary px-20 py-5'><Link to='/#home'>Home</Link></li>
          <li className='hover:text-primary px-20 py-5'><Link to='/#about'>About</Link></li>
          <li className='hover:text-primary px-20 py-5'><Link to='blog#main'>Blog</Link></li>
          <li className='hover:text-primary px-20 py-5'><Link to='/#contact'>Contact</Link></li>
        </ul>
        <ul className='flex text-3xl justify-around w-full items-center text-foreground'>
          <li className='hover:text-primary p-4'><Link to='https://github.com/sadikeey' target='_blank'><AiFillGithub /></Link></li>
          <li className='hover:text-primary p-4'><Link to='https://linkedin.com/in/sadikeey' target='_blank'><AiFillLinkedin /></Link></li>
          <li className='hover:text-primary p-4'><Link to='https://twitter.com/sadikeey' target='_blank'><AiFillTwitterCircle /></Link></li>
          <li className='hover:text-primary p-4'><Link to='mailto:sadiksaifi205@gmail.com' target='_blank'><HiMail /></Link></li>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
