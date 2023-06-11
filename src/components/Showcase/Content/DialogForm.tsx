import React from 'react'
import {Box, Button, DialogContent, FormControlLabel, IconButton, MenuItem, Switch} from "@mui/material"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import {useModalStyle} from "../style";
import {SimpleField, SimpleSelect} from "../../Form";
import {useAppSelector} from "../../../hooks/redux";
import {Showcase} from "../../../schemas/base";
import DeleteButton from "../../Form/DeleteButton";
import {useFormValidation} from "./DialogFormValidation.hooks";
import {useFormSubmit} from "./DialogFormSubmit.hooks";
import {useFormInitial} from "./DialogFormInitial.hooks";
import {MuiFileInput} from "mui-file-input";
import {useDictionaryTranslate, useIsLoadingDisplay} from "../../../hooks/pages";
import LoadingCircular from "../../LoadingCircular";
import DialogFormImages from "./DialogFormImages";
import DialogFormColors from "./DialogFormColors";
import DialogFormName from "./DialogFormName";


interface DialogFormProps {
  open: boolean
  onCloseDialog: () => void
  selectedShowcaseItem: Showcase | null
}

const DialogForm = ({open, onCloseDialog, selectedShowcaseItem}: DialogFormProps) => {
  const {showcase, namesAndColors, brandNames, isLoading} = useAppSelector(state => state.showcaseSlice)
  const d = useDictionaryTranslate('showcase')
  const showLoading = useIsLoadingDisplay(isLoading)
  const style = useModalStyle()
  const isAddMode = selectedShowcaseItem === null
  const selectedShowcaseItemKey = isAddMode ? '' : selectedShowcaseItem.key
  const [
    formData, setFormData, resetFormData, itemsNames, itemsColors
  ] = useFormInitial(showcase, namesAndColors, selectedShowcaseItem)
  const [
    onNameFieldSelect, onColorFieldSelect, onBrandFieldChange, onTitleFieldChange, onTitleUaFieldChange,
    onDescFieldChange, onDescUaFieldChange, onUrlFieldChange, onYoutubeFieldChange, onActiveChange, onPromActiveChange,
    onFileChange, checkForm
  ] = useFormValidation(formData, setFormData, isAddMode, showcase, selectedShowcaseItem)
  const [submitAdd, submitEdit, deleteItem, deleteImage] = useFormSubmit(selectedShowcaseItemKey, resetFormData)
  const isShowcase = (showcaseItem: Showcase | null): showcaseItem is Showcase => !isAddMode
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
    if(!isAddMode){
      await deleteItem(selectedShowcaseItem.key)
      onCloseDialog()
      resetFormData()
    }

  }
  const onClose = () => {
    onCloseDialog()
    resetFormData()
  }
  return (
    <Dialog open={open} onClose={onClose} sx={style} className='myDialog'>
      <DialogTitle className='title'>{isAddMode ? d('add') : d('edit')} {d('item')}</DialogTitle>
      <IconButton aria-label="close" onClick={onClose} className='dialog-x'>
        <CloseIcon/>
      </IconButton>
      <DialogContent className='form'>
        <Box className='flexFields'>
          <DialogFormName
            names={itemsNames} selectedName={formData.name.value} onChangeName={onNameFieldSelect}
            error={!!formData.name.error} disabled={!isAddMode}
          />

          {(itemsColors.length > 0) &&
            <DialogFormColors colors={itemsColors} selectedColor={formData.color.value}
                              onChangeColor={onColorFieldSelect}
                              disabled={!isAddMode} error={formData.color.error}/>
          }

          <SimpleSelect name='brand' label={d('brand')} value={formData.brand_id ? formData.brand_id : '-1'}
                        setValue={onBrandFieldChange}>
            <MenuItem value='-1'></MenuItem>
            {brandNames.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
            ))}
          </SimpleSelect>
          <FormControlLabel sx={{whiteSpace: 'nowrap'}} label='prom active' control={
            <Switch color='secondary' checked={formData.promActive}
                    onChange={(event) => onPromActiveChange(event.target.checked)}/>
          }/>
          <FormControlLabel label='active' control={
            <Switch color='secondary' checked={formData.active}
                    onChange={(event) => onActiveChange(event.target.checked)}/>
          }/>
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
          <Box sx={{width: '88'}}>
            <SimpleField name='youtube' label='youtube' value={formData.youtube.value} error={formData.youtube.error}
                         setValue={onYoutubeFieldChange}/>
          </Box>

          <MuiFileInput size='small' multiple value={formData.files} onChange={onFileChange} hideSizeText
                        color='secondary'/>
        </Box>
        {(isShowcase(selectedShowcaseItem) && selectedShowcaseItem.images) &&
          <DialogFormImages selectedShowcaseItem={selectedShowcaseItem} onClickDelImg={deleteImage}/>
        }

      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={onClose}>{d('close')}</Button>
        <Button variant='contained' color='secondary' onClick={submitForm} disabled={isLoading}>
          {isAddMode ? d('add') : d('edit')}
        </Button>
      </DialogActions>
      <LoadingCircular show={showLoading}/>
    </Dialog>
  )
}

export default DialogForm