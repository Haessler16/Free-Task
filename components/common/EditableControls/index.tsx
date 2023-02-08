import { FC, useEffect } from 'react'
import {
  Flex,
  useEditableControls,
  ButtonGroup,
  IconButton,
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'

export const EditableControls: FC<{ handleClick?: any }> = ({
  handleClick,
}) => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls()

  return isEditing ? (
    <ButtonGroup justifyContent='center' size='sm'>
      <IconButton
        icon={<CheckIcon />}
        aria-label='check'
        {...getSubmitButtonProps()}
        onClick={(e) => {
          handleClick && handleClick(e)
          const isButtonProps = getSubmitButtonProps()
          isButtonProps.onClick && isButtonProps.onClick(e)
        }}
      />
      <IconButton
        icon={<CloseIcon />}
        aria-label='close'
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent='center'>
      <IconButton
        aria-label='edit'
        size='sm'
        icon={<EditIcon />}
        {...getEditButtonProps()}
      />
    </Flex>
  )
}
