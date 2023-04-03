import { Link } from 'react-router-dom'

interface ICardProps {
  title: string
  desc: string
  img: string
}

const Card: React.FC<ICardProps> = (props) => {
  const url = props.title.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-');
  const description = props.desc.substring(0, 100);
  return (
    <Link to={`/blog/${url}#post`}>
      <div className='m-8 w-full mx-auto flex flex-col md:flex-row bg-altbackground rounded-xl'>
        <img className='rounded-t-xl md:rounded-t-none md:rounded-bl-xl md:rounded-tl-xl md:w-[20vw]' src={props.img} alt=''></img>
        <div className='p-4'>
          <h1 className='text-xl md:text-2xl font-bold pb-2'>{props.title}</h1>
          <p className='text-altforeground text-sm md:text-lg'>
            {`${description}... `}
            <Link className='text-blue-400 text-sm' to={`/blog/${url}#post`}>Read More</Link>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Card
