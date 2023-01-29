import { useSession } from 'next-auth/react'

import fetcher from 'utils/fetcher'
import useSWR from 'swr'

import { iFolder } from 'utils/interfaces/folder'
import { iUser } from 'utils/interfaces/user'

export const useGetFolders = () => {
  const { data: session } = useSession()
  const { data, error, isLoading } = useSWR<iFolder[]>(
    session ? `/api/folders?userId=${(session?.user as iUser).id}` : null,
    fetcher,
  )
  return { folders: data, isLoading, error, user: session?.user as iUser }
}
