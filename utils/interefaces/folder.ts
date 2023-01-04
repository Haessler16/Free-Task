import { iNotes } from './notes'

export interface iFolder {
  id: string
  title: string
  notes: iNotes[]
}
