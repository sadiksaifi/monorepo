import { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <div className="fixed flex bg-gray-200 h-20 px-8 py-4 w-full md:px-40 2xl:px-96 justify-between items-center">
        <div className="text-2xl">Sadik Saifi</div>
        <ul className="md:flex justify-between hidden">
          <li className="text-sm px-6 uppercase">Home</li>
          <li className="text-sm px-6 uppercase">About</li>
          <li className="text-sm px-6 uppercase">Blog</li>
          <li className="text-sm pl-6 uppercase">Contact</li>
        </ul>
        <div className='block md:hidden cursor-pointer text-3xl' onClick={() => setOpen(!isOpen)}>
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu /> }
        </div>
      </div>
      <div>
        <ul className={` md:hidden flex flex-col fixed items-center uppercase text-xl bg-gray-200 p-24 top-20 h-full w-[75%] ease-in-out duration-500 ${isOpen ? 'right-0' : 'right-[-100%]'} `}>
          <li className="p-4 py-8">Home</li>
          <li className="p-4 py-8">About</li>
          <li className="p-4 py-8">Blog</li>
          <li className="p-4 py-8">Contact</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
