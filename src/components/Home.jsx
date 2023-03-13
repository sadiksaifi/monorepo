import { Link } from 'react-router-dom'
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillInstagram,
} from 'react-icons/ai'
import { HiMail } from 'react-icons/hi'

const Home = () => {
  return (
    <div
      id='home'
      className='text-foreground flex flex-col justify-center items-center gap-8 text-center h-[91vh] pt-8 md:px-[5.5vw]'
    >
      <h1 className='text-4xl md:text-5xl font-extrabold px-8 uppercase leading-[3rem] tracking-[0.2rem]'>
        Hey, I'm Sadik Saifi
      </h1>
      <p className='leading-8 text-lg md:text-2xl text-altforeground'>
        A skilled{' '}
        <span className='text-foreground font-bold'>web developer</span>{' '}
        creating stunning, user-friendly websites and web applications with
        expertise of web technologies, various programming languages and
        frameworks.
      </p>
      <button
        className='bg-primary text-foreground hover:bg-altprimary px-16 pt-[0.8rem]
        md:px-20 py-[.5rem] md:px-20 md:py-4 rounded-lg text-sm md:text-lg 
        font-bold uppercase mt-4 shadow-slate-50'
        type='button'
      >
        Contact Me !
      </button>
      <ul className='hidden md:block absolute left-0 text-3xl text-altbackground bg-altforeground rounded-r-lg'>
        <li className='hover:bg-primary hover:text-foreground p-4 hover:rounded-tr-lg'><Link to='https://github.com/sadikeey' target='_blank'><AiFillGithub /></Link></li>
        <li className='hover:bg-primary hover:text-foreground p-4'><Link to='https://twitter.com/sadikeey' target='_blank'><AiFillTwitterCircle /></Link></li>
        <li className='hover:bg-primary hover:text-foreground p-4'><Link to='https://instagram.com/sadikeey' target='_blank'><AiFillInstagram /></Link></li>
        <li className='hover:bg-primary hover:text-foreground p-4 hover:rounded-br-lg'><Link to='mailto:sadiksaifi205@gmail.com' target='_blank'><HiMail /></Link></li>
      </ul>
      <div id='mouse' className='hidden md:block absolute bottom-4 w-[1px] px-[10px] py-[1px] h-[35px] border-2 border-altforeground rounded-[25px] box-content opacity-75'>
        <div className='w-[3px] h-[10px] rounded-[25%] mt-2 bg-altforeground animate-bounce '>
      </div>
      </div>
    </div>
  )
}

export default Home
