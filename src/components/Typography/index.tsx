import { TitleProps } from '@/interfaces'

export const SectionTitle = ({ children }: TitleProps) => {
  return <h2 className='mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300'>{children}</h2>
}

export const PageTitle = ({ children }: TitleProps) => {
  return <h1 className='my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200'>{children}</h1>
}
