import { IDashProps } from "../types/components"

const Dash: React.FC<IDashProps> = ({ className }) => {
  return (
    <div
      id='dash'
      className={`relative w-[40px] h-[4px] border-2 border-primary bg-primary rounded-xl ${className}`}
    ></div>
  )
}

export default Dash
