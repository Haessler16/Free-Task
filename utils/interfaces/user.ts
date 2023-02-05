import { iNote } from './notes'
import { iTask } from './task'

export type tRole = 'admin' | 'edit' | 'read'

export interface iUser {
  id: number
  name: string
  email: string
  password: string
  image: string
  provider: string
  role: tRole
  createdAt?: number
  notes?: iNote[]
  task?: iTask[]
}
