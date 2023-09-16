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
    path: 'https://github.com/sadiksaifi',
    socialMediaIcon: AiFillGithub,
  },
  {
    id: 2,
    name: 'Linkedin',
    path: 'https://linkedin.com/in/sadiksaifi',
    socialMediaIcon: AiFillLinkedin,
  },
  {
    id: 3,
    name: 'Twitter',
    path: 'https://twitter.com/thesadiksaifi',
    socialMediaIcon: AiFillTwitterCircle,
  },
  {
    id: 4,
    name: 'Email',
    path: 'mailto:thesadiksaifi@gmail.com',
    socialMediaIcon: HiMail,
  },
]

export default socialMediaNavigationLinks
