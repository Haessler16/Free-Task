import { Dispatch, FC, SetStateAction } from 'react'
import NextLink from 'next/link'
import { Card, Checkbox, Heading, HStack, Link, Text } from '@chakra-ui/react'
import { DeleteButton } from 'components/common/Button/Delete'
import { iTask } from 'utils/interfaces/task'

import { mutate } from 'swr'

interface iTaskListProps {
  task: iTask
  userId: number
  done?: boolean
}

export const TaskList: FC<iTaskListProps> = ({
  task,
  userId,
  done = false,
}) => {
  const handleCheck = async (isCheck: boolean) => {
    const bum = await fetch('api/tasks', {
      method: 'PUT',
      body: JSON.stringify({ id: task.id, title: task.title, done: isCheck }),
    })

    const data = await bum.json()

    if (data) {
      mutate(`/api/tasks?userId=${userId}`)
    }
  }

  return (
    <Card p='4' flexDir='row' justifyContent='space-between' shadow='2xl'>
      <HStack w='92%' justify='center' align='center'>
        <Checkbox
          isChecked={done}
          onChange={(e) => handleCheck(e.target.checked)}
        />
        <Link
          w='100%'
          as={NextLink}
          href={`/tasks/${task.id}`}
          _hover={{ textDecoration: 'none' }}>
          <Heading
            as={done ? 's' : undefined}
            color={done ? 'gray' : undefined}>
            {task.title}
          </Heading>
        </Link>
      </HStack>

      <DeleteButton
        title='Task'
        id={task.id}
        type='rounded'
        deleteUrl='/api/tasks'
        userId={userId}
      />
    </Card>
  )
}
