import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AiOutlineMenu,
         AiOutlineClose,
         AiFillGithub,
         AiFillTwitterCircle,
         AiFillInstagram,
       } from 'react-icons/ai'
import {HiMail} from 'react-icons/hi'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div id='navbar' className='container'>
      <div className='fixed border-b-2 border-altdark z-50 flex bg-dark h-16 w-full px-4 md:px-40 2xl:px-96 justify-between items-center'>
        <img className='w-10 fill-white' src='assests/logo.svg' alt='sdk-logo' />
        <ul className='md:flex justify-between hidden text-sm font-bold text-light uppercase gap-12'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='about'>About</Link></li>
          <li><Link to='blog'>Blog</Link></li>
          <li><Link to='contact'>Contact</Link></li>
        </ul>
        <div className='block md:hidden cursor-pointer text-3xl font-extrabold p-1 rounded-sm z-1 text-light'
             onClick={() => setOpen(!isOpen)}
        >
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>
      <div className={` fixed border-l-2 border-altdark flex md:hidden flex-col justify-around bg-dark p-32 h-[100vh] z-40 w-[75%] ease-in-out duration-500 ${isOpen ? 'right-0' : 'right-[-100%]'} ` } onClick={() => setOpen(!isOpen)}>
        <ul className={` flex flex-col gap-28 items-center uppercase text-xl text-light `}>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='about'>About</Link></li>
          <li><Link to='blog'>Blog</Link></li>
          <li><Link to='contact'>Contact</Link></li>
        </ul>
        <ul className='flex text-3xl justify-around w-full items-center gap-6'>
          <li><Link to ='https://github.com/sadikeey' target='_blank'><AiFillGithub className='text-light'/></Link></li>
          <li><Link to ='https://twitter.com/sadikeey' target='_blank'><AiFillTwitterCircle className='text-light'/></Link></li>
          <li><Link to ='https://instagram.com/sadikeey' target='_blank'><AiFillInstagram className='text-light'/></Link></li>
          <li><Link to ='mailto:sadiksaifi205@gmail.com' target='_blank'><HiMail className='text-light'/></Link></li>

        </ul>
      </div>
    </div>
  )
}

export default Navbar
