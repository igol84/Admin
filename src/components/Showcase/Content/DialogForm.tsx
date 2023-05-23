import React from 'react'
import {Box, Button, DialogContent, IconButton} from "@mui/material"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import {useModalStyle} from "../style";
import {SimpleAutocomplete, SimpleField} from "../../Form";
import {useAppSelector} from "../../../hooks/redux";
import {Showcase} from "../../../schemas/base";
import DeleteButton from "../../Form/DeleteButton";
import {useFormValidation} from "./DialogFormValidation.hooks";
import {useFormSubmit} from "./DialogFormSubmit.hooks";
import {useFormInitial} from "./DialogFormInitial.hooks";

interface DialogFormProps {
  open: boolean
  onCloseDialog: () => void
  showcaseItem: Showcase | null
}

const DialogForm = ({open, onCloseDialog, showcaseItem}: DialogFormProps) => {
  const {showcase, productsNames} = useAppSelector(state => state.showcaseSlice)
  const style = useModalStyle()
  const isAddMode = showcaseItem === null
  const [formData, setFormData, resetFormData, itemsNames] = useFormInitial(showcase, showcaseItem, isAddMode, productsNames)
  const [
    onNameFieldChange, onTitleFieldChange, onDescFieldChange, onUrlFieldChange, checkForm
  ] = useFormValidation(formData, setFormData, isAddMode, showcase, showcaseItem)

  const [submitAdd, submitEdit, deleteItem] = useFormSubmit()

  const submitForm = async () => {
    if (checkForm()) {
      if (isAddMode)
        await submitAdd(formData)
      else
        await submitEdit(formData)
      resetFormData()
      onCloseDialog()
    }
  }
  const onClickDelete = async () => {
    await deleteItem(formData.name.value)
    resetFormData()
    onCloseDialog()
  }

  return (
    <Dialog open={open} onClose={onCloseDialog} sx={style}>
      <DialogTitle className='title'>{isAddMode ? 'Add' : 'Edit'} Item</DialogTitle>
      <IconButton aria-label="close" onClick={onCloseDialog} className='dialog-x'>
        <CloseIcon/>
      </IconButton>
      <DialogContent className='form'>
        <Box sx={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <SimpleAutocomplete
            disabled={!isAddMode}
            freeSolo={false}
            name='color'
            label={'name'}
            value={formData.name.value}
            setValue={onNameFieldChange}
            items={itemsNames}
            setItem={onNameFieldChange}
            error={formData.name.error}
            blurOnSelect
            focusText
          />
          {!isAddMode &&
            <Box><DeleteButton deletable={true} onRemove={onClickDelete}/></Box>
          }
        </Box>
        <SimpleField name='title' label='title' value={formData.title.value} error={formData.title.error}
                     setValue={onTitleFieldChange}/>
        <SimpleField name='desc' label='desc' value={formData.desc} setValue={onDescFieldChange} multiline={true}
                     maxRows={4}/>
        <SimpleField name='url' label='url' value={formData.url.value} error={formData.url.error}
                     setValue={onUrlFieldChange}/>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={onCloseDialog}>Close</Button>
        <Button variant='contained' color='secondary' onClick={submitForm}>{isAddMode ? 'Add' : 'Edit'}</Button>

      </DialogActions>
    </Dialog>
  )
}

export default DialogForm