import { MainLayout } from 'layouts/main'
import Head from 'next/head'

const Task = () => {
  return (
    <MainLayout>
      <Head>
        <title>Task</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/asignacion.png' />
      </Head>
      <main>Task</main>
    </MainLayout>
  )
}

export default Task