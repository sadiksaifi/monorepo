const Button = (props) => {
  return (
    <>
      <button
        className={`px-16 rounded-lg text-sm md:text-lg font-bold uppercase mt-4 ${props.className}`}
        type={props.type}
      >
        {props.content}
      </button>
    </>
  )
}

export default Button
