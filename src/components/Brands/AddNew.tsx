import React from 'react'
import {Fab} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import {useDictionaryTranslate} from "../../hooks/pages";


interface AddNewProps {
  onOpenDialog: () => void
}

const AddNew = ({onOpenDialog}: AddNewProps) => {
  const d = useDictionaryTranslate('brand')
  return (
    <Fab color="secondary" aria-label={d('add')} onClick={onOpenDialog}>
      <AddIcon/>
    </Fab>
  )
}

export default AddNew