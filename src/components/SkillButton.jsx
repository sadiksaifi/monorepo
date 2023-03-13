const SkillButton = (props) => {
  return (
    <div>
      <button className='bg-neutral-800 text-foreground font-bold px-8 py-[0.7rem] rounded-sm' type='button'>{props.name}</button>
    </div>
  ) 
}


export default SkillButton
