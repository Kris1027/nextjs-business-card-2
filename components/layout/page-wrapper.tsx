import type { ReactNode } from 'react'

export default function PageWrapper({ children }: { children: ReactNode }) {
  return <div className='cs-page cs-fade-in'>{children}</div>
}
