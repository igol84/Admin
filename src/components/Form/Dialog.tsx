import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {useDialogStyle} from "./style";
import CloseIcon from '@mui/icons-material/Close';
import {useDictionaryTranslate} from "../../hooks/pages";
import {IconButton} from "@mui/material";

interface DeleteDialogType {
  isOpen: boolean
  handleConfirm: () => void
  handleClose: () => void
}

export default function DeleteDialog(props: DeleteDialogType) {
  const dictForm = useDictionaryTranslate('form')
  const style = useDialogStyle()
  const {isOpen, handleConfirm, handleClose} = props


  return (
    <Dialog
      sx={style}
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">
        {dictForm('youSure')}
        <IconButton aria-label="close" onClick={handleClose} color="inherit">
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogActions>
        <Button id="alert-dialog-yes" onClick={handleConfirm}>{dictForm('yes')}</Button>
        <Button id="alert-dialog-no" onClick={handleClose} autoFocus>{dictForm('no')}</Button>
      </DialogActions>
    </Dialog>
  )
}