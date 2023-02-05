import { useSession } from 'next-auth/react'

// INTERFACES
import { iNote } from 'utils/interfaces/notes'
import { iUser } from 'utils/interfaces/user'

import fetcher from 'utils/fetcher'
import useSWR from 'swr'

interface iUseGetNotesProps {
  fallback: iNote[]
  folderId: number | null
}

export const useGetNotes = ({ fallback, folderId }: iUseGetNotesProps) => {
  const { data: session } = useSession()

  const { data, isLoading, error } = useSWR<iNote[]>(
    session
      ? `/api/notes?userId=${(session?.user as iUser).id}&folderId=${folderId}`
      : null,
    fetcher,
    {
      fallbackData: fallback,
    },
  )

  return { notesData: data, isLoading, error, session }
}
