import { iNotes } from './notes'

export interface iFolder {
  id: number
  title: string
  notes: iNotes[]
  selected?: boolean
}
