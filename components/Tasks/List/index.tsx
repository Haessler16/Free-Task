import { FC } from 'react'
import NextLink from 'next/link'
import { Box, Card, Checkbox, Heading, Link, Text } from '@chakra-ui/react'
import { DeleteButton } from 'components/common/Button/Delete'
import { iTask } from 'utils/interfaces/task'

interface iTaskListProps {
  task: iTask
  userId: number
}

export const TaskList: FC<iTaskListProps> = ({ task, userId }) => {
  return (
    <Card p='4' flexDir='row' justifyContent='space-between' shadow='2xl'>
      <Box w='92%'>
        <Checkbox>
          <Link
            as={NextLink}
            href={`/task/${task.id}`}
            _hover={{ textDecoration: 'none' }}>
            <Heading>{task.title}</Heading>
          </Link>
        </Checkbox>
      </Box>

      <DeleteButton
        title='Task'
        id={task.id}
        type='rounded'
        deleteUrl='/api/task'
        userId={userId}
      />
    </Card>
  )
}
