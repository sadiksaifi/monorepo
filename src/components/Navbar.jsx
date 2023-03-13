import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillInstagram,
} from 'react-icons/ai'
import { HiMail } from 'react-icons/hi'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <div id='navbar' className='w-full flex justify-center'>
      <div className='fixed flex justify-between items-center bg-background 
        h-[9vh] md:h-[10vh] w-full px-6 xl:px-28 2xl:px-96 z-50  backdrop-filter
        backdrop-blur-lg bg-opacity-50'>
        <img className='w-10 fill-white' src='assests/logo.svg' alt='sdk-logo' />
        <ul className='md:flex justify-between hidden text-sm font-bold text-foreground uppercase'>
          <li className='hover:text-primary p-4'><Link to='/'>Home</Link></li>
          <li className='hover:text-primary p-4'><Link to='about'>About</Link></li>
          <li className='hover:text-primary p-4'><Link to='blog'>Blog</Link></li>
          <li className='hover:text-primary p-4'><Link to='contact'>Contact</Link></li>
        </ul>
        <div className='block md:hidden cursor-pointer text-3xl font-extrabold p-1 z-1 text-foreground'
          onClick={() => setOpen(!isOpen)}
        >
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>
      <div className={` fixed flex md:hidden flex-col justify-between bg-background 
        top-[9vh] h-[91vh] p-10 pb-24 pt-20 z-40 w-[75vw] ease-in-out backdrop-filter 
        backdrop-blur-lg bg-opacity-50 duration-500 ${isOpen ? 'right-0' : 'right-[-100vw]'} `}
        onClick={() => setOpen(!isOpen)}
      >
        <ul className={` flex flex-col items-center uppercase text-xl text-foreground `}>
          <li className='hover:text-primary px-20 py-5'><Link to='/'>Home</Link></li>
          <li className='hover:text-primary px-20 py-5'><Link to='about'>About</Link></li>
          <li className='hover:text-primary px-20 py-5'><Link to='blog'>Blog</Link></li>
          <li className='hover:text-primary px-20 py-5'><Link to='contact'>Contact</Link></li>
        </ul>
        <ul className='flex text-3xl justify-around w-full items-center text-foreground'>
          <li className='hover:text-primary p-4'><Link to='https://github.com/sadikeey' target='_blank'><AiFillGithub /></Link></li>
          <li className='hover:text-primary p-4'><Link to='https://twitter.com/sadikeey' target='_blank'><AiFillTwitterCircle /></Link></li>
          <li className='hover:text-primary p-4'><Link to='https://instagram.com/sadikeey' target='_blank'><AiFillInstagram /></Link></li>
          <li className='hover:text-primary p-4'><Link to='mailto:sadiksaifi205@gmail.com' target='_blank'><HiMail /></Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
