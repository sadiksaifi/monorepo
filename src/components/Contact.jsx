import Dash from './Dash'
import Button from './Button'

const Contact = () => {
  return (
    <section id='contact' href='contact' className='flex flex-col w-full mt-20 item-center text-foreground'>
      <h1 className='text-3xl md:text-4xl mx-auto font-extrabold uppercase tracking-[0.4rem]'>
        Contact
      </h1>
      <Dash className='mx-auto my-6'/>
      <p className="text-center text-sm text-altforeground">Feel free to Contact me by submitting the form below and I will get back to you as soon as possible</p>
      <form className='flex flex-col gap-2 w-full md:w-[80%] mx-auto m-10 p-8 bg-altbackground rounded-xl'>
        <div className="flex flex-col">
          <label htmlFor='name' className='text-sm font-bold text-altforeground'>Name</label>
          <input type='text' name='name' className='rounded-lg p-4 my-2 text-sm bg-background text-foreground font-extrabold' placeholder="Enter Your Name" />
        </div>
        <div className="flex flex-col">
          <label htmlFor='name' className='text-sm font-bold text-altforeground'>Email</label>
          <input type='email' name='email' className='rounded-lg p-4 my-2 text-sm bg-background text-foreground font-extrabold' placeholder="Enter Your Email" />
        </div>
        <div className="flex flex-col">
          <label htmlFor='name' className='text-sm font-bold text-altforeground'>Message</label>
          <textarea name='name' id='name' className='rounded-lg p-4 my-2 h-52 text-sm bg-background resize-none text-foreground font-extrabold' placeholder="Enter Your Message" />
        </div>
        <Button content='Submit' type='button' className='py-4 bg-primary text-foreground hover:bg-altforeground hover:text-background' />
      </form>
    </section>
  )
}

export default Contact
