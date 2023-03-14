import Dash from "../Dash"
const Pages = (props) => {
  return (
    <div id='post' className="text-foreground pt-16 md:pt-20 h-screen">
      <img src={props.img} alt="post img" className="w-full h-48 md:h-3/6 object-cover" />
      <h1 className="text-3xl font-bold pt-4">{props.title}</h1>
      <Dash className='my-2' />
      <div className="text-altforeground py-4" dangerouslySetInnerHTML={{__html: props.desc}} />
    </div>
  )
}

export default Pages
