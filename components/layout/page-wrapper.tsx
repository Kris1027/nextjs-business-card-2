import type { ReactNode } from 'react'

type PageWrapperProps = {
  children: ReactNode
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return <main className='flex-1 p-4 space-y-4 max-w-7xl mx-auto w-full'>{children}</main>
}

export default PageWrapper
