import { Link } from 'react-router-dom'
import { ISocialMediaNavigationLinkItemProps } from '../types/components'

const SocialMediaNavigationLinkItem = ({
  name,
  path,
  socialMediaIcon: SocialMediaIcon,
  className,
}: ISocialMediaNavigationLinkItemProps) => {
  return (
    <li className={className}>
      <Link to={path} target='_blank'>
        {name}
        <SocialMediaIcon />
      </Link>
    </li>
  )
}

export default SocialMediaNavigationLinkItem
