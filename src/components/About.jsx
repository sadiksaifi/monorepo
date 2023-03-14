import SkillButton from './SkillButton'
import Dash from './Dash'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <section
      id='about'
      className='md:pt-40 pt-20 md:pb-20 text-foreground flex flex-col items-center w-full'
    >
      <h1 className='text-3xl md:text-4xl font-extrabold mb-5 md:mb-8 uppercase tracking-[0.4rem]'>
        About Me
      </h1>
      <Dash />
      <p className='leading-8 text-sm mt-4 md:mt-6 md:text-xl text-altforeground text-center md:px-[7vw]'>
        Here you will find more information about me, what I do, and my current
        skills mostly in terms of programming and technology
      </p>
      <div
        id='about-info'
        className='flex flex-col md:flex-row mt-8 md:mt-28 md:justify-evenly w-full'
      >
        <div id='about-main' className='md:pr-8 md:w-[50vw] my-8'>
          <h1 className='text-3xl font-extrabold text-foreground mb-2'>
            Get to know me!
          </h1>
          <Dash />
          <p className='leading-8 text-sm mt-4 md:mt-6 md:text-xl mt-6 text-altforeground flex flex-col gap-4'>
            <span className='block'>
              I'm a{' '}
              <span className='font-bold text-foreground'>
                Frontend Web Developer
              </span>{' '}
              building the Front-end of Websites and Web Applications that leads
              to the success of the overall product. Check out usefull articles
              in the{' '}
              <Link
                className='font-bold text-foreground hover:text-primary'
                to='/blog'
              >
                Blog
              </Link>{' '}
              section.
            </span>{' '}
            <span>
              I'm open to Job opportunities where I can contribute, learn and
              grow. If you have a good opportunity that matches my skills and
              experience then don't hesitate to{' '}
              <a
                className='text-foreground font-bold hover:text-primary'
                href='#contact'
              >
                contact me
              </a>
              .
            </span>
          </p>
        </div>
        <div id='skills' className='md:pr-8 md:w-[50vw] my-8'>
          <h1 className='text-3xl font-extrabold text-foreground mb-2'>
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
    </section>
  )
}

export default About
