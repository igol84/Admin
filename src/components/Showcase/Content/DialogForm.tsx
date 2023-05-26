import React from 'react'
import {Box, Button, DialogContent, IconButton} from "@mui/material"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import {useModalStyle} from "../style";
import {SimpleAutocomplete, SimpleField} from "../../Form";
import {useAppSelector} from "../../../hooks/redux";
import {Showcase, ShowcaseWithImages} from "../../../schemas/base";
import DeleteButton from "../../Form/DeleteButton";
import {useFormValidation} from "./DialogFormValidation.hooks";
import {useFormSubmit} from "./DialogFormSubmit.hooks";
import {useFormInitial} from "./DialogFormInitial.hooks";
import {MuiFileInput} from "mui-file-input";
import {useIsLoadingDisplay} from "../../../hooks/pages";
import LoadingCircular from "../../LoadingCircular";
import DialogFormImages from "./DialogFormImages";

interface DialogFormProps {
  open: boolean
  onCloseDialog: () => void
  selectedShowcaseItem: ShowcaseWithImages | null
}

const DialogForm = ({open, onCloseDialog, selectedShowcaseItem}: DialogFormProps) => {
  const {showcase, productsNames, isLoading} = useAppSelector(state => state.showcaseSlice)
  const showLoading = useIsLoadingDisplay(isLoading)
  const style = useModalStyle()
  const isAddMode = selectedShowcaseItem === null
  const [formData, setFormData, resetFormData, itemsNames] = useFormInitial(showcase, selectedShowcaseItem, isAddMode, productsNames)
  const [
    onNameFieldChange, onTitleFieldChange, onDescFieldChange, onUrlFieldChange, onFileChange, checkForm
  ] = useFormValidation(formData, setFormData, isAddMode, showcase, selectedShowcaseItem)

  const [submitAdd, submitEdit, deleteItem, deleteImage] = useFormSubmit()
  const isShowcase = (showcaseItem: Showcase | null): showcaseItem is Showcase => !isAddMode
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
            disabled={!isAddMode} freeSolo={false} name='color' label={'name'} value={formData.name.value}
            setValue={onNameFieldChange} items={itemsNames} setItem={onNameFieldChange} error={formData.name.error}
            blurOnSelect focusText
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
        <MuiFileInput multiple value={formData.files} onChange={onFileChange} hideSizeText color='secondary'/>

        {(isShowcase(selectedShowcaseItem) && selectedShowcaseItem.images) &&
          <DialogFormImages selectedShowcaseItem={selectedShowcaseItem} onClickDelImg={deleteImage}/>
        }

      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={onCloseDialog}>Close</Button>
        <Button variant='contained' color='secondary' onClick={submitForm} disabled={isLoading}>
          {isAddMode ? 'Add' : 'Edit'}
        </Button>
      </DialogActions>
      <LoadingCircular show={showLoading}/>
    </Dialog>
  )
}

export default DialogForm