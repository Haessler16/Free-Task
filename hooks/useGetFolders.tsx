import { useSession } from 'next-auth/react'

import fetcher from 'utils/fetcher'
import useSWR from 'swr'

import { iFolder } from 'utils/interfaces/folder'
import { iUser } from 'utils/interfaces/user'

interface iUseGetFoldersProps {
  fallback: iFolder[]
}

export const useGetFolders = ({ fallback }: iUseGetFoldersProps) => {
  const { data: session } = useSession()
  const { data, error, isLoading } = useSWR<iFolder[]>(
    session ? `/api/folders?userId=${(session?.user as iUser).id}` : null,
    fetcher,
    {
      fallbackData: fallback,
    },
  )
  return { foldersData: data, isLoading, error, user: session?.user as iUser }
}
