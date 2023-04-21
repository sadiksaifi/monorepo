import { HiMail } from 'react-icons/hi'
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from 'react-icons/ai'
import { ISocialMediaNavigationLink } from '../types/components/navbar'

const socialMediaNavigationLinks: ISocialMediaNavigationLink[] = [
  {
    id: 1,
    name: 'Github',
    path: 'https://github.com/sadikeey',
    socialMediaIcon: AiFillGithub,
  },
  {
    id: 2,
    name: 'Linkedin',
    path: 'https://linkedin.com/in/sadikeey',
    socialMediaIcon: AiFillLinkedin,
  },
  {
    id: 3,
    name: 'Twitter',
    path: 'https://twitter.com/sadikeey',
    socialMediaIcon: AiFillTwitterCircle,
  },
  {
    id: 4,
    name: 'Email',
    path: 'mailto:sadiksaifi205@gmail.com',
    socialMediaIcon: HiMail,
  },
]

export default socialMediaNavigationLinks
