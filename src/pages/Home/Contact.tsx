import emailjs from '@emailjs/browser'
import Dash from '../../components/Dash'
import Button from '../../components/Button'
import { useRef, useState } from 'react'

/* Required field indicator */
const Required: React.FC = () => <span className='text-red-500 mx-1'>*</span>

/* Contact form */
const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>()
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  /* Send email using email.js */
  const sendEmail: React.FormEventHandler<HTMLFormElement>
  = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {

    /* Prevent default behaviour of form */
    e.preventDefault()

    /* Send email */
    try {
      await emailjs.sendForm(
        'service_rd8i839',
        'template_rrl7mbq',
        formRef.current as HTMLFormElement,
        'VWnoOerrYn4GOnO12'
      )
      setIsSubmitted(!isSubmitted)
      e.currentTarget.reset()
    } catch (error) {
      console.error('Failed to send email:', error)
    }

  }

  /* Render contact form */
  return (
    <section id='contact' className='flex flex-col w-full mt-20 item-center text-foreground'>
      <h1 className='text-3xl md:text-4xl mx-auto font-extrabold uppercase tracking-[0.4rem]'>
        Contact
      </h1>
      <Dash className='mx-auto my-6' />
      <p className="text-center text-sm text-altforeground">Feel free to Contact me by submitting the form below and I will get back to you as soon as possible</p>
      <form ref={formRef as React.RefObject<HTMLFormElement>} onSubmit={sendEmail} className='flex flex-col gap-2 w-full md:w-[80%] mx-auto m-10 p-6 md:p-8 bg-altbackground rounded-xl'>
        <div className="flex flex-col">
          <label htmlFor='name' className='text-sm font-bold text-altforeground'>Name<Required /></label>
          <input type='text' name='user_name' className='rounded-lg p-4 my-2 text-sm bg-background text-foreground font-extrabold' placeholder="Enter Your Name" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor='email' className='text-sm font-bold text-altforeground'>Email<Required /></label>
          <input type='email' name='user_email' className='rounded-lg p-4 my-2 text-sm bg-background text-foreground font-extrabold' placeholder="Enter Your Email" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor='message' className='text-sm font-bold text-altforeground'>Message<Required /></label>
          <textarea name='user_message' id='message' className='rounded-lg p-4 my-2 h-52 text-sm bg-background resize-none text-foreground font-extrabold' placeholder="Enter Your Message" required />
        </div>

        <p className={isSubmitted ? 'block' : 'hidden'}>Message Sent Successfully!</p>

        <Button content='Submit' type='submit' className='py-4 bg-primary text-foreground hover:bg-altforeground hover:text-background' />
      </form>
    </section>
  )
}

export default Contact
