export interface INavigationLinks {
  id: number
  name: string
  path: string
}

export interface ISocialMediaNavigationLink {
  id: number
  name?: string
  path: string
  socialMediaIcon: React.ComponentType<React.SVGProps<SVGSVGElement>> 
}

export interface INavigationLinkItemProps {
  name: string
  path: string
  className?: string
}
