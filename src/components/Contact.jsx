const Contact = () => {
    return (
      <div id='contact' className="container p-12 md:px-40 2xl:px-96 mx-auto ">
        <div id='header-contact'>
          <h1 className="text-2xl font-extrabold">CONTACT ME</h1>
          <p className="font-extralight text-base">Required fields<span className="text-red-400"> *</span></p>
        </div>
        <div id='form'>
          <form>
        <div className="flex flex-row items-start w-[100%] pt-8">
          <input className="border-2 border-black p-2 mr-2" type='text' placeholder="First Name"></input>
          <input className="border-2 border-black p-2 ml-2" type='text' placeholder="Last Name"></input>
        </div>
          </form>
        </div>
      </div>
    )
}

export default Contact
