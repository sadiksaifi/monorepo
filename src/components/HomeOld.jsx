const Home = () => {
  return (
    <div id='home' className='container px-8 md:px-40 2xl:px-96 mx-auto'>
      <div id='main-content' className="mx-auto flex flex-col items-center">
        <div id='name' className="absolute top-60">
           <h1 className="text-4xl font-bold text-center tracking-[0.7rem]">SADIK SAIFI</h1> 
           <h3 className="text-center font-thin text-lg">WEB DEVELOPER</h3>
        </div>
        <div id='box' className="h-[70vh] w-[80%] rounded-full bg-gray-200 mt-20"></div>
      </div>
      <div id='button' className="p-10 flex items-center justify-center">
        <button className="bg-black text-white text-lg px-12 py-2 w-72 rounded-full" type="button">Contact Me!</button>       
      </div>
    </div>
  )
}

export default Home
