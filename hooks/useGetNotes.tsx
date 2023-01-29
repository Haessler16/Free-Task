import { FC } from 'react'
import { iNote } from 'utils/interfaces/notes'
import { iUser } from 'utils/interfaces/user'

import fetcher from 'utils/fetcher'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { iFolder } from 'utils/interfaces/folder'

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
  console.log({ folderId })
  return { notesData: data, isLoading, error, session }
}
