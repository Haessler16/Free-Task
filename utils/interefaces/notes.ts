import { iFolder } from './folder'
import { iUser } from './user'

export interface iNotes {
  id: number
  title: string
  description: string
  characters: number
  created: number
  user: iUser
  folder: iFolder
}
