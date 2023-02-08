import fetcher from 'utils/fetcher'
import useSWR from 'swr'

import { iFolder } from 'utils/interfaces/folder'
import { iUser } from 'utils/interfaces/user'
import { useUser } from './useUser'

interface iUseGetFoldersProps {
  fallback: iFolder[]
}

export const useGetFolders = ({ fallback }: iUseGetFoldersProps) => {
  const { user } = useUser()
  const { data, error, isLoading } = useSWR<iFolder[]>(
    user ? `/api/folders?userId=${user.id}` : null,
    fetcher,
    {
      fallbackData: fallback,
    },
  )
  return { foldersData: data, isLoading, error, user }
}
