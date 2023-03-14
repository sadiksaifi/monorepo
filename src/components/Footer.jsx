import {AiOutlineCopyrightCircle} from 'react-icons/ai'
import Dash from './Dash'

const Footer = () => {
  let year = new Date().getFullYear()
  return (
    <footer className='p-10 mt-28 text-altforeground text-sm w-[100%] text-center'>
      <Dash className='mx-auto m-6'/>
      <p><AiOutlineCopyrightCircle className='inline' />{' '}Copyright{' '}{year}.</p>
      <p>Designed and Developed by Sadik Saifi</p>
    </footer>
  )
}

export default Footer
