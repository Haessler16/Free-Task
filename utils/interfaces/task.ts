import { iUser } from './user'

export interface iTask {
  id: number
  title: string
  user: iUser
  createdAt: number
  done: boolean
  subtask: {
    title: string
  }
}
