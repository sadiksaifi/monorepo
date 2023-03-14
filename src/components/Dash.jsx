const Dash = (props) => {
  return (
    <div
      id='dash'
      className={`relative w-[40px] h-[4px] border-2 border-primary bg-primary rounded-xl ${props.className}`}
    ></div>
  )
}

export default Dash
