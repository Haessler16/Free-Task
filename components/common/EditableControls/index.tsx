import {
  Flex,
  useEditableControls,
  ButtonGroup,
  IconButton,
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'

export function EditableControls() {
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
