import { iNotes } from './notes'
import { iTask } from './task'

export interface iUser {
  id: number
  name: string
  email: string
  // password: string
  image: string
  role: 'admin' | 'edit' | 'read'
  created: number
  notes: iNotes[]
  task: iTask[]
}
