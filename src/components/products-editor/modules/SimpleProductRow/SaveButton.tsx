import {GridActionsCellItem} from "@mui/x-data-grid";
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import React from "react";
import {useDictionaryTranslate} from "../../../../hooks/pages";

interface SaveButtonType {
  disabled?: boolean
  onConfirm: () => Promise<void>
}

const SaveButton = (props: SaveButtonType) => {
  const dict = useDictionaryTranslate('form')
  const {disabled, onConfirm} = props

  return (
    <GridActionsCellItem
      icon={<SaveRoundedIcon/>}
      label={dict('save')}
      onClick={onConfirm}
      color="inherit"
      disabled={disabled}
    />
  )
}

export default SaveButton