import { useSession } from 'next-auth/react'

// INTERFACES
import { iTask } from 'utils/interfaces/task'
import { iUser } from 'utils/interfaces/user'

import fetcher from 'utils/fetcher'
import useSWR from 'swr'

interface iUseGetTasksProps {
  fallback: iTask[]
}

export const useGetTasks = ({ fallback }: iUseGetTasksProps) => {
  const { data: session } = useSession()

  const { data, isLoading, error } = useSWR<iTask[]>(
    session ? `/api/tasks?userId=${(session?.user as iUser).id}` : null,
    fetcher,
    {
      fallbackData: fallback,
    },
  )

  return { tasksData: data, isLoading, error, session }
}
