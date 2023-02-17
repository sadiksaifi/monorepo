import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div id='navbar' className='pb-20 container'>
      <div className='fixed z-50 flex bg-gray-200 h-20 py-4 w-full px-8 md:px-40 2xl:px-96 justify-between items-center'>
        <div className='text-2xl uppercase font-extrabold'>sdk</div>
        <ul className='md:flex justify-between hidden'>
          <Link to='/'><li className='text-sm px-6 uppercase'>Home</li></Link>
          <Link to='about'><li className='text-sm px-6 uppercase'>About</li></Link>
          <Link to='blog'><li className='text-sm px-6 uppercase'>Blog</li></Link>
          <Link to='contact'><li className='text-sm pl-6 uppercase'>Contact</li></Link>
        </ul>
        <div className='block md:hidden cursor-pointer text-3xl' onClick={() => setOpen(!isOpen)}>
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>
      <div onClick={() => setOpen(!isOpen)}>
        <ul className={` md:hidden z-50 flex flex-col fixed items-center uppercase text-xl bg-gray-200 p-24 top-20 h-full w-[75%] ease-in-out duration-500 ${isOpen ? 'right-0' : 'right-[-100%]'} `}>
          <Link to='/'><li className='p-4 py-8'>Home</li></Link>
          <Link to='about'><li className='p-4 py-8'>About</li></Link>
          <Link to='blog'><li className='p-4 py-8'>Blog</li></Link>
          <Link to='contact'><li className='p-4 py-8'>Contact</li></Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
