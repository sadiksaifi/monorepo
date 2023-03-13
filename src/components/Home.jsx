import { Link } from 'react-router-dom'
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillInstagram,
} from 'react-icons/ai'
import { HiMail } from 'react-icons/hi'
import SkillButton from './SkillButton'
import Dash from './Dash'

const Home = () => {
  return (
    <>
      <div
        id='home'
        className='text-foreground flex flex-col justify-center items-center gap-8 text-center h-[91vh] pt-8 md:px-[5.5vw]'
      >
        <h1 className='text-4xl md:text-5xl font-extrabold px-8 uppercase leading-[3rem] tracking-[0.2rem]'>
          Hey, I'm Sadik Saifi
        </h1>
        <p className='leading-8 text-lg md:text-2xl text-altforeground'>
          A skilled {' '}
          <span className='text-primary font-bold'>Web Developer</span> creating
          stunning, user-friendly websites and web applications with expertise
          of web technologies, various programming languages and frameworks.
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
          <li className='hover:bg-primary hover:text-foreground p-4 hover:rounded-tr-lg'>
            <Link to='https://github.com/sadikeey' target='_blank'>
              <AiFillGithub />
            </Link>
          </li>
          <li className='hover:bg-primary hover:text-foreground p-4'>
            <Link to='https://twitter.com/sadikeey' target='_blank'>
              <AiFillTwitterCircle />
            </Link>
          </li>
          <li className='hover:bg-primary hover:text-foreground p-4'>
            <Link to='https://instagram.com/sadikeey' target='_blank'>
              <AiFillInstagram />
            </Link>
          </li>
          <li className='hover:bg-primary hover:text-foreground p-4 hover:rounded-br-lg'>
            <Link to='mailto:sadiksaifi205@gmail.com' target='_blank'>
              <HiMail />
            </Link>
          </li>
        </ul>
        <a href='#about'>
          <div
            id='mouse'
            className='hidden md:block absolute bottom-4 w-[1px] px-[10px] py-[1px] h-[35px] border-2 border-altforeground hover:border-primary rounded-[25px] box-content opacity-75'
          >
            <div className='w-[3px] h-[10px] rounded-[25%] mt-2 bg-altforeground hover:bg-primary animate-bounce '></div>
          </div>
        </a>
      </div>

      <div
        id='about'
        className='pt-40 text-foreground flex flex-col items-center h-screen w-full'
      >
        <h1 className='text-3xl md:text-4xl font-extrabold px-8 mb-8 uppercase tracking-[0.4rem]'>
          About Me
        </h1>
        <Dash />
        <p className='leading-8 text-lg mt-8 md:text-xl text-altforeground text-center px-[7vw]'>
          Here you will find more information about me, what I do, and my
          current skills mostly in terms of programming and technology
        </p>
        <div id='about-info' className='flex mt-24 justify-evenly w-full'>
          <div id='about-main' className='pr-8 w-[50vw]'>
            <h1 className='text-3xl font-extrabold text-foreground mb-4'>
              Get to know me!
            </h1>
            <Dash />
            <p className='leading-8 text-lg mt-6 text-altforeground flex flex-col gap-4'>
              <span className='block'>
                I'm a <span className='font-bold text-foreground'>Frontend Web Developer</span> building the Front-end of Websites
                and Web Applications that leads to the success of the overall
                product. Check out some of my work in the Projects section.
              </span>{' '}
              <span className='block'>
                I also like sharing content related to the stuff that I have
                learned over the years in Web Development so it can help other
                people of the Dev Community. Feel free to Connect or Follow me
                on my <Link className='text-foreground font-bold hover:text-primary' to='https://github.com/sadikeey' target='_blank'>Github</Link> where I have useful content related to Web
                Development and Programming.
              </span>{' '}
              <span>
              I'm open to Job opportunities where I can contribute, learn and
              grow. If you have a good opportunity that matches my skills and
              experience then don't hesitate to <a className='text-foreground font-bold hover:text-primary' href='#contact'>contact me</a>.
              </span>
            </p>
          </div>
          <div id='skills' className='pl-8 w-[50vw]'>
            <h1 className='text-3xl font-extrabold text-foreground mb-4'>
              Tech Stack
            </h1>
            <Dash />
            <div className='flex flex-wrap gap-4 mt-8'>
              <SkillButton name='HTML' />
              <SkillButton name='CSS' />
              <SkillButton name='JavaScript' />
              <SkillButton name='TypeScript' />
              <SkillButton name='React' />
              <SkillButton name='Tailwind' />
              <SkillButton name='StyledComponets' />
              <SkillButton name='Bootstrap' />
              <SkillButton name='Git' />
              <SkillButton name='Github' />
              <SkillButton name='Linux' />
              <SkillButton name='Vim' />
              <SkillButton name='Emacs' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
