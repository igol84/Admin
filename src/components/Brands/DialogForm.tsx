import React from 'react'
import {Box, Button, DialogContent, IconButton, Switch} from "@mui/material"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import {useModalStyle} from "./style";
import {MuiFileInput} from "mui-file-input";
import {Brand, BrandWithImage} from "../../schemas/base";
import DeleteButton from "../Form/DeleteButton";
import {SimpleField} from "../Form";
import {useFormInitial} from "./DialogFormInitial.hooks";
import {makeId} from "../../utilite";
import {useFormValidation} from "./DialogFormValidation.hooks";
import {useAppSelector} from "../../hooks/redux";
import LoadingCircular from "../LoadingCircular";
import {useDictionaryTranslate, useIsLoadingDisplay} from "../../hooks/pages";
import {useFormSubmit} from "./DialogFormSubmit.hooks";

interface DialogFormProps {
  open: boolean
  onCloseDialog: () => void
  selectedBrand: BrandWithImage | null
}

const DialogForm = ({open, onCloseDialog, selectedBrand}: DialogFormProps) => {
  const {isLoading, brands} = useAppSelector(state => state.brandSlice)
  const d = useDictionaryTranslate('brand')
  const style = useModalStyle()
  const showLoading = useIsLoadingDisplay(isLoading)
  const isAddMode = selectedBrand === null
  const isBrand = (brand: Brand | null): brand is Brand => !isAddMode
  const [formData, setFormData, resetFormData] = useFormInitial(selectedBrand, isAddMode)
  const [
    onNameFieldChange, onTitleFieldChange, onTitleUaFieldChange, onDescFieldChange, onDescUaFieldChange,
    onUrlFieldChange, onActiveChange, onFileChange, checkForm
  ] = useFormValidation(formData, setFormData, isAddMode, brands, selectedBrand)
  const [submitAdd, submitEdit, deleteBrand] = useFormSubmit()
  const submitForm = async () => {
    if (checkForm()) {
      if (isAddMode)
        await submitAdd(formData)
      else
        await submitEdit(formData)
      onCloseDialog()
      resetFormData()
    }
  }
  const onClickDelete = async () => {
    await deleteBrand(formData.id,)
    onCloseDialog()
    resetFormData()
  }
  const hostPictures = import.meta.env.VITE_BRANDS_URL
  return (
    <Dialog open={open} onClose={onCloseDialog} sx={style} className='myDialog'>
      <DialogTitle className='title'>
        {isAddMode ? d('add') : d('edit')} {d('brand')} id:{!isAddMode && selectedBrand.id}
      </DialogTitle>

      <IconButton aria-label="close" onClick={onCloseDialog} className='dialog-x'>
        <CloseIcon/>
      </IconButton>
      <DialogContent className='form'>
        <Box className='flexFields'>
          {(isBrand(selectedBrand) && selectedBrand.image) &&
            <img width='60px' src={`${hostPictures}/${selectedBrand.image}?${makeId(5)}`} alt={selectedBrand.title}/>
          }
          <SimpleField name='name' label={d('name')} value={formData.name.value} error={formData.name.error}
                       setValue={onNameFieldChange}/>
          <Switch color='secondary' checked={formData.active}
                  onChange={(event) => onActiveChange(event.target.checked)}/>
          {!isAddMode &&
            <Box><DeleteButton deletable={true} onRemove={onClickDelete}/></Box>
          }
        </Box>
        <Box className='flexFields'>
          <SimpleField name='title' label={d('title')} value={formData.title.value} error={formData.title.error}
                       setValue={onTitleFieldChange}/>
          <SimpleField name='titleUa' label={d('titleUa')} value={formData.titleUa.value} error={formData.titleUa.error}
                       setValue={onTitleUaFieldChange}/>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <SimpleField name='desc' label={d('desc')} value={formData.desc} setValue={onDescFieldChange} multiline={true}
                       maxRows={4}/>
          <SimpleField name='descUa' label={d('descUa')} value={formData.descUa} setValue={onDescUaFieldChange}
                       multiline={true} maxRows={4}/>
        </Box>
        <Box className='flexFields'>
          <SimpleField name='url' label='url' value={formData.url.value} error={formData.url.error}
                       setValue={onUrlFieldChange}/>
          <MuiFileInput size='small' value={formData.file} onChange={onFileChange} hideSizeText
                        color='secondary'/>
        </Box>


      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={onCloseDialog}>{d('close')}</Button>
        <Button variant='contained' color='secondary' onClick={submitForm} disabled={isLoading}>
          {isAddMode ? d('add') : d('edit')}
        </Button>
      </DialogActions>
      <LoadingCircular show={showLoading}/>
    </Dialog>
  )
}

export default DialogForm