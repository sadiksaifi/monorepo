import { useRouteError } from 'react-router-dom'

const ErrorPage: React.FC = () => {
  const error: any = useRouteError()
  return (
    <section id='error-page' className='text-slate-200 flex flex-col gap-8 justify-center items-center h-screen'>
      <h1 className='text-5xl font-bold'>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className='text-slate-400'>
        <i>{error.statusText || error.message}</i>
      </p>
    </section>
  )
}

export default ErrorPage
