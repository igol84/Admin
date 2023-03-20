import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {useDialogStyle} from "../Form/style";
import CloseIcon from '@mui/icons-material/Close';
import {GridActionsCellItem} from "@mui/x-data-grid";

interface DeleteDialogType {
  isOpen: boolean
  handleConfirm: () => void
  handleClose: () => void
}

export default function DeleteDialog(props: DeleteDialogType) {
  const style = useDialogStyle()
  const {isOpen, handleConfirm, handleClose} = props


  return (
    <Dialog
      sx={style}
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete the item?"}
        <GridActionsCellItem
          icon={<CloseIcon/>}
          label={'close'}
          onClick={handleClose}
          color="inherit"
        />
      </DialogTitle>
      <DialogActions>
        <Button id="alert-dialog-yes" onClick={handleConfirm}>Yes</Button>
        <Button id="alert-dialog-no" onClick={handleClose} autoFocus>No</Button>
      </DialogActions>
    </Dialog>
  )
}