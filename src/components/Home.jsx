const Home = () => {
  return (
    <div id='home' className='container px-8 pt-12 md:px-40 2xl:px-96 mx-auto flex flex-col'>
    <img src="assests/men.jpg" className="rounded-full w-20 mb-4"></img>
      <h1 className='uppercase text-3xl font-extrabold tracking-[0.2rem]'>
        sadik saifi
      </h1>
      <p className='font-thin text-sm tracking-[0.1rem] uppercase text-gray-400'>Web Developer</p>
      <div className='bg-gray-200 h-80 mt-4 p-6 rounded-lg drop-shadow-xl'>
        <h2 className='text-xl font-bold pb-2'>Hi there 😃</h2>
        <p>
          I'm Sadik Saifi who is 21-year-old studying Bachelor of Computer
          Applications at Graphic Era University in Dehradun. I'm quite
          enthusiastic about programming and a curious person about new
          technologies and ideas. I am always open to collabrate on projects and
          new innovative/disruptive ideas.
        </p>
      </div>

      <div id='button' className='p-10 flex items-center justify-center'>
        <button
          className='bg-black text-white text-lg px-12 py-2 w-72 rounded-full'
          type='button'
        >
          Contact Me!
        </button>
      </div>
    </div>
  )
}

export default Home
