import {
  Card,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Link,
} from '@chakra-ui/react'
import { MainLayout } from 'layouts/main'
import { getSession, GetSessionParams } from 'next-auth/react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export async function getServerSideProps(
  context: GetSessionParams | undefined,
) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

const Note = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <MainLayout>
      <Head>
        <title>Note</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/asignacion.png' />
      </Head>

      <main style={{ padding: '0px 1.25rem' }}>
        <Card px={5}>
          <Link as={NextLink} href='/notes'>
            Go back
          </Link>
          Note {id}
          <Editable defaultValue='Take some chakra'>
            <EditablePreview />
            <EditableInput />
          </Editable>
          <Editable defaultValue='Take some chakra'>
            <EditablePreview />
            <EditableTextarea />
          </Editable>
        </Card>
      </main>
    </MainLayout>
  )
}

export default Note
