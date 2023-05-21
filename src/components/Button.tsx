import { IButtonProps } from "../types/components"

const Button: React.FC<IButtonProps> = ({ content, type, className }) => {
  return (
    <>
      <button
        className={`px-16 rounded-lg text-sm md:text-lg font-bold uppercase mt-4 ${className}`}
        type={type}
      >
        {content}
      </button>
    </>
  )
}

export default Button
