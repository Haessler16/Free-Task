import { iUser } from './user'

export interface iTask {
  id: string
  title: string
  user: iUser
  createdAt: number
  subtask: {
    title: string
  }
}
