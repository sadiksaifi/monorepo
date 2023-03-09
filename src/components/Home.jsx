const Home = () => {
  return (
    <div
      id='home'
      className='container px-8 pt-24 md:px-40 2xl:px-96 mx-auto flex flex-col'
    >
      <img
        src='assests/men.jpg'
        className='rounded-full w-20 mb-4'
        alt='men-pic'
      ></img>
      <h1 className='uppercase text-3xl text-light font-extrabold tracking-widest'>
        sadik saifi
      </h1>
      <p className='font-thin text-sm tracking-widest uppercase text-gray-400'>
        Web Developer
      </p>
      <div className='bg-[#313134] mt-4 p-6 rounded-lg drop-shadow-xl'>
        <h2 className='text-xl font-bold pb-2 text-light'>Hi there 😃</h2>
        <p className="text-light">
          I'm Sadik Saifi who is 21-year-old studying Bachelor of Computer
          Applications at Graphic Era University in Dehradun. I'm quite
          enthusiastic about programming and a curious person about new
          technologies and ideas. I am always open to collabrate on projects and
          new innovative/disruptive ideas.
        </p>
      </div>

      {/* <div id='button' className='p-10 flex items-center justify-center'> */}
      <button
        className=' hidden bg-black text-white text-lg px-12 py-2 w-64 rounded-lg mt-8'
        type='button'
      >
        Contact Me!
      </button>
      {/* </div> */}
    <br /><br /><br />
      <div className="text-light hidden">
        {' '}
        Imperdiet nullam in, cursus eleifend condimentum, interdum metus fusce,
        placerat euismod tempor magna ultrices leo non nunc felis tristique
        faucibus enim nullam dis nibh sit consectetur. Semper pulvinar lorem
        dapibus tristique est ut hac tincidunt gravida turpis tempor quis dictum
        dictumst facilisis dapibus efficitur nunc odio enim dapibus porta fusce
        habitasse tempor morbi amet erat sit. Nullam urna eleifend nunc lorem,
        arcu rhoncus vitae dolor non ante eget efficitur cras a amet. Sit neque
        eu felis tempor id pellentesque pellentesque, vitae lacus odio sed,
        feugiat orci ac efficitur aliquam vel aenean pellentesque imperdiet
        vitae turpis vestibulum nulla nunc. Dolor aliquam laoreet in id, hac
        pulvinar etiam tincidunt ornare arcu tristique finibus dictum efficitur
        ullamcorper in, etiam praesent varius, consequat vel ac. Feugiat ante
        tristique ac id pharetra finibus non quisque est feugiat libero magna,
        tempor dignissim penatibus mi nulla convallis nunc vestibulum nam cras,
        maximus efficitur sit placerat. Iaculis lacus faucibus turpis fusce,
        faucibus lectus tempor faucibus non nunc magna ac id varius consequat
        ullamcorper dignissim et vitae amet turpis, tristique consequat faucibus
        consequat consectetur. Tincidunt pellentesque tempor eleifend in
        imperdiet condimentum velit convallis. Condimentum condimentum magna
        vestibulum dui ac enim ante justo pulvinar sapien turpis,. Felis turpis
        eu sapien consequat convallis sit dui suscipit pellentesque aliquam
        tempor lectus. Tempus interdum dolor, nulla efficitur malesuada viverra
        in vestibulum sed aliquet ipsum, sit nunc feugiat ante habitasse
        dignissim efficitur est dignissim nulla malesuada. Porta faucibus etiam,
        venenatis faucibus duis et diam hac imperdiet odio. Lectus nullam velit
        erat vel efficitur dui maximus neque vitae. Maecenas ultricies ligula
        sed elementum gravida vulputate praesent dignissim ut, massa rhoncus
        aliquam donec duis. Eleifend placerat tempor in diam risus non mi tempus
        sed tincidunt pellentesque, diam erat dui. Fringilla tempor vivamus nunc
        suspendisse aliquet integer ante congue, at praesent eros ut convallis
        nec pellentesque id tortor elit faucibus ligula id pharetra pharetra
        vivamus ultricies, varius morbi dui. Tempus feugiat praesent ut tellus
        consectetur dui, consequat ante nibh dis et pellentesque ac leo quis,
        orci nisl. Ac aliquam vel arcu habitasse et ligula vivamus arcu rutrum
        cras, penatibus est id viverra diam vulputate sagittis nullam lectus.
        Etiam id sed. Risus dis vel vulputate nulla est ac ac tincidunt
        convallis ut iaculis, donec leo consequat etiam eleifend turpis tempor
        id tincidunt varius penatibus in ac dui bibendum. Vulputate aliquam
        tempor integer consectetur diam tempor convallis odio facilisis
        efficitur curabitur lacus etiam vestibulum nunc pharetra at proin
        vestibulum.
      </div>
    </div>
  )
}

export default Home
