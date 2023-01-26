import { iFolder } from './folder'
import { iUser } from './user'

export interface iNote {
  id: number
  title: string
  description?: string
  characters: number
  createdAt: number
  userId: number
  folderId: number
}
