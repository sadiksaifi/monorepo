export interface IButtonProps {
  content: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export interface IDashProps {
  className?: string
}


export interface ISkillButtonProps {
  name: string
}

export interface ISocialMediaNavigationLinkItemProps {
  name?: string
  path: string
  socialMediaIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  className?: string
}

