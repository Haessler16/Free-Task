import { useSession } from 'next-auth/react'

// INTERFACES
import { iNote } from 'utils/interfaces/notes'
import { iUser } from 'utils/interfaces/user'

import fetcher from 'utils/fetcher'
import useSWR from 'swr'
import { useUser } from './useUser'

interface iUseGetNotesProps {
  fallback: iNote[]
  folderId: number | null
}

export const useGetNotes = ({ fallback, folderId }: iUseGetNotesProps) => {
  const { user } = useUser()

  const { data, isLoading, error } = useSWR<iNote[]>(
    user ? `/api/notes?userId=${user.id}&folderId=${folderId}` : null,
    fetcher,
    {
      fallbackData: fallback,
    },
  )

  return { notesData: data, isLoading, error, user }
}
