import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { iUser } from 'utils/interfaces/user'

export const useUser = () => {
  const { data: session } = useSession()
  const user = useMemo(() => session?.user as iUser, [session?.user])

  return { user }
}
