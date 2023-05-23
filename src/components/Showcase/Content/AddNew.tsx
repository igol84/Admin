import React from 'react'
import {Fab} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';


interface AddNewProps {
  onOpenDialog: () => void
}

const AddNew = ({onOpenDialog}: AddNewProps) => {
  return (
    <Fab color="secondary" aria-label="add" onClick={onOpenDialog}>
      <AddIcon/>
    </Fab>
  )
}

export default AddNew