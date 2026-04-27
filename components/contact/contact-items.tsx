'use client'

import { useState } from 'react'
import { type Icon } from '@phosphor-icons/react'
import {
  CheckIcon,
  CopyIcon,
  DiscordLogoIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  MailboxIcon,
  PhoneIcon,
} from '@phosphor-icons/react'

type ContactItemType = 'email' | 'phone' | 'discord' | 'link'

type ContactItemProps = {
  icon: Icon
  name: string
  type: ContactItemType
  value: string
  href?: string
}

const contacts: ContactItemProps[] = [
  { icon: MailboxIcon, name: 'Email', type: 'email', value: 'kris1027.dev@gmail.com' },
  { icon: PhoneIcon, name: 'Telefon/WhatsApp', type: 'phone', value: '+48 792 542 841' },
  { icon: DiscordLogoIcon, name: 'Discord', type: 'discord', value: 'kris8927' },
  {
    icon: GithubLogoIcon,
    name: 'GitHub',
    type: 'link',
    value: 'github.com/Kris1027',
    href: 'https://github.com/Kris1027',
  },
  {
    icon: LinkedinLogoIcon,
    name: 'LinkedIn',
    type: 'link',
    value: 'linkedin.com/in/krzysztof-obarzanek',
    href: 'https://linkedin.com/in/krzysztof-obarzanek',
  },
]

const ContactItem = ({ icon: IconComponent, name, type, value, href }: ContactItemProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resolvedHref =
    type === 'email' ? `mailto:${value}` : type === 'phone' ? `tel:${value}` : href

  const hasLink = type === 'email' || type === 'phone' || type === 'link'
  const copyValue = type === 'link' ? (href ?? value) : value

  return (
    <li className='flex items-center gap-3 text-gray-400'>
      <IconComponent size={20} className='shrink-0' />
      <div className='flex flex-col'>
        <span className='text-xs text-gray-500'>{name}</span>
        <div className='flex items-center gap-2'>
          {hasLink ? (
            <a
              href={resolvedHref}
              target={type === 'link' ? '_blank' : undefined}
              rel={type === 'link' ? 'noopener noreferrer' : undefined}
              className='hover:text-white transition-colors'
            >
              {value}
            </a>
          ) : (
            <span>{value}</span>
          )}
          <button
            onClick={handleCopy}
            className='text-gray-500 hover:text-gray-300 transition-colors'
            aria-label={`Copy ${name}`}
          >
            {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
          </button>
        </div>
      </div>
    </li>
  )
}

const ContactItems = () => {
  return (
    <ul className='space-y-3'>
      {contacts.map(contact => (
        <ContactItem key={contact.name} {...contact} />
      ))}
    </ul>
  )
}

export default ContactItems
