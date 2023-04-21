import { ISkillButtonProps } from "../types/components";

const SkillButton: React.FC<ISkillButtonProps> = (props) => {
  return (
    <div>
      <button
        className='bg-altbackground hover:bg-primary text-sm text-foreground font-bold px-4 md:px-6 py-[0.6rem] md:py-[0.8rem] rounded-[0.2rem]'
        type='button'
      >
        {props.name}
      </button>
    </div>
  )
}

export default SkillButton
