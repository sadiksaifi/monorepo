import Dash from '../../components/Dash'
import blog from '../../data/blog'
import { Link } from 'react-router-dom'

const Blog: React.FC = () => {
  return (
    <div id='main' className="pt-24 md:pt-32 text-foreground">
      <h1 className="text-3xl font-extrabold">Posts</h1>
      <Dash className='my-2' />
      <p className='mt-4 text-red-400 text-sm md:text-lg'>* Blog section is still in progress.</p>
      <div className="m-4">
        <Link to ='/blog/1'>First Post</Link>
      </div>
    </div>
  )
}

export default Blog
