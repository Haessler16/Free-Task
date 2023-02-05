import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import prisma from 'lib/prisma'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  const {
    query: { id },
  } = context

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const task = await prisma.task.findUnique({
    where: {
      id: id ? Number(id) : undefined,
    },
  })

  return {
    props: {
      task: JSON.parse(JSON.stringify(task)),
    },
  }
}

const Task = () => {
  return <div>bum</div>
}

export default Task
