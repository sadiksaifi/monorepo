import Dash from "../Dash"
import Card from "./Card"
import data from './data.js'

const Blog = () => {
  return (
    <div id='main' className="pt-24 md:pt-32 text-foreground">
      <h1 className="text-3xl font-extrabold">Posts</h1>
      <Dash className='my-2' />
      <div className="m-4">
        {data.map((item, index) => (
          <Card 
            key={index}
            img={item.img}
            title={item.title}
            desc={item.desc}
          />
        ))}
      </div>
    </div>
  )
}

export default Blog
