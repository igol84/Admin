import React, {useLayoutEffect, useState} from 'react'
import {Box, Button, DialogContent, IconButton, MenuItem} from "@mui/material"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import {useModalStyle} from "../style";
import {fieldRequired, SimpleField, SimpleSelect} from "../../Form";
import {FormData} from "./types";
import produce from "immer";
import {useAppSelector} from "../../../hooks/redux";
import {useFetchAccess} from "../../../hooks/pages";
import {addNewItem, delShowcase, updateShowcase} from "../../../store/actions/showcase";
import {CreateShowcase, UpdateShowcase} from "../../../schemas/showcase";
import {Showcase} from "../../../schemas/base";
import DeleteButton from "../../Form/DeleteButton";

interface DialogFormProps {
  open: boolean
  onCloseDialog: () => void
  showcaseItem: Showcase | null
}

const DialogForm = ({open, onCloseDialog, showcaseItem}: DialogFormProps) => {
  const {showcase, productsNames} = useAppSelector(state => state.showcaseSlice)
  const style = useModalStyle()
  const isAddMode = showcaseItem === null
  const isShowcase = (showcaseItem: Showcase | null): showcaseItem is Showcase => !isAddMode
  const addItemAccess = useFetchAccess(addNewItem)
  const editItemAccess = useFetchAccess(updateShowcase)
  const deleteItemAccess = useFetchAccess(delShowcase)
  const initialFormData: FormData = {
    name: {value: '', error: ''}, title: {value: '', error: ''}, desc: '', url: {value: '', error: ''}
  }


  const [formData, setFormData] = useState<FormData>(initialFormData)
  const resetFormData = () => {
    setFormData(initialFormData)
  }
  useLayoutEffect(() => {
    const changedFormData: FormData = !isShowcase(showcaseItem) ? initialFormData : {
      name: {value: showcaseItem.name, error: ''},
      title: {value: showcaseItem.title, error: ''},
      desc: showcaseItem.desc,
      url: {value: showcaseItem.url, error: ''}
    }
    setFormData(changedFormData)
  }, [showcaseItem])

  const onNameFieldChange = (name: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.name.value = name
      prevFormData.name.error = fieldRequired(name)
    }))
  }
  const onTitleFieldChange = (title: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.title.value = title
      prevFormData.title.error = fieldRequired(title)
    }))
  }

  const onDescFieldChange = (desc: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.desc = desc
    }))
  }

  const onUrlFieldChange = (url: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.url.value = url
      prevFormData.url.error = fieldRequired(url)
    }))
  }

  const showcaseWithoutSelf = isShowcase(showcaseItem)
    ? showcase.filter(item => item.name != showcaseItem.name)
    : showcase
  const urlExist = (url: string) => showcaseWithoutSelf.find(item => item.url === url.trim())

  const checkForm = async () => {
    if (fieldRequired(formData.name.value) || fieldRequired(formData.title.value) || fieldRequired(formData.url.value)) {
      setFormData(produce(prevFormData => {
        prevFormData.name.error = fieldRequired(formData.name.value)
        prevFormData.title.error = fieldRequired(formData.title.value)
        prevFormData.url.error = fieldRequired(formData.url.value)
      }))
    } else if (urlExist(formData.url.value)) {
      setFormData(produce(prevFormData => {
        prevFormData.url.error = 'same url is exist'
      }))
    } else {
      if (isAddMode)
        await submitAdd(formData)
      else
        await submitEdit(formData)
      resetFormData()
      onCloseDialog()
    }
  }
  const onClickDelete = async () => {
    await deleteItemAccess(formData.name.value)
    resetFormData()
    onCloseDialog()
  }

  const submitAdd = async (formData: FormData) => {
    const newItem: CreateShowcase = {
      name: formData.name.value,
      title: formData.title.value,
      desc: formData.desc,
      url: formData.url.value,
      active: true,
      youtube: ''
    }
    await addItemAccess(newItem)
  }

  const submitEdit = async (formData: FormData) => {
    const updatedItem: UpdateShowcase = {
      name: formData.name.value,
      title: formData.title.value,
      desc: formData.desc,
      url: formData.url.value,
      active: true,
      youtube: ''
    }
    await editItemAccess(updatedItem)
  }

  return (
    <Dialog open={open} onClose={onCloseDialog} sx={style}>
      <DialogTitle className='title'>{isAddMode ? 'Add' : 'Edit'} Item</DialogTitle>
      <IconButton aria-label="close" onClick={onCloseDialog} className='dialog-x'>
        <CloseIcon/>
      </IconButton>
      <DialogContent className='form'>
        <Box sx={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <SimpleSelect name='name' label='name' value={formData.name.value} setValue={onNameFieldChange}
                        error={formData.name.error} defaultValue='' disabled={!isAddMode}>
            <MenuItem value={''}></MenuItem>
            <MenuItem sx={{display: 'none'}} value={formData.name.value}>{formData.name.value}</MenuItem>
            {isAddMode && productsNames.map(name => {
              return <MenuItem key={name} value={name}>{name}</MenuItem>
            })}
          </SimpleSelect>
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
        <Button variant='contained' color='secondary' onClick={checkForm}>{isAddMode ? 'Add' : 'Edit'}</Button>

      </DialogActions>
    </Dialog>
  )
}

export default DialogForm