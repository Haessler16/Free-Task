import { iNotes } from './notes'
import { iTask } from './task'

type tRole = 'admin' | 'edit' | 'read'
export interface iUser {
  id: number
  name: string
  email: string
  password: string
  image: string
  role: tRole
  createdAt?: number
  notes?: iNotes[]
  task?: iTask[]
}
