import { iNotes } from './notes'
import { iTask } from './task'

export interface iUser {
  id: number
  name: string
  email: string
  password: string
  role: 'admin' | 'editor' | 'normal'
  created: number
  notes: iNotes[]
  task: iTask[]
}
