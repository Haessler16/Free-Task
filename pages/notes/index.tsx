import Head from 'next/head'
import { MainLayout } from 'layouts/main'
import { NotesList } from 'components/Notes/List'
import { iNotes } from 'utils/interefaces/notes'
import { Grid } from '@chakra-ui/react'

const data: iNotes[] = [
  {
    id: 1,
    title: 'Tarea',
    description: 'bum',
    characters: 3,
    created: Date.now(),
    user: 'Tovim',
  },
  {
    id: 2,
    title: 'task',
    description: 'fin fan fun',
    characters: 11,
    created: Date.now(),
    user: 'Tovim',
  },
  {
    id: 3,
    title: 'Aja',
    description: 'katum',
    characters: 5,
    created: Date.now(),
    user: 'Tovim',
  },
]

const Notes = () => {
  return (
    <MainLayout>
      <Head>
        <title>Notes</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/asignacion.png' />
      </Head>

      <main>
        <Grid
          id='characters_grid'
          templateColumns='repeat(auto-fit, minmax(min(100%, 22rem), 1fr))'
          gap={2}
          px={5}>
          {data.map((note) => {
            return <NotesList key={note.id} note={note} />
          })}
        </Grid>
      </main>
    </MainLayout>
  )
}

export default Notes
