import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import React from "react";
import {useDictionaryTranslate} from "../../hooks/pages";
import {IconButton} from "@mui/material";

interface SaveButtonType {
  disabled?: boolean
  onConfirm: () => Promise<void> | void
}

const SaveButton = (props: SaveButtonType) => {
  const dict = useDictionaryTranslate('form')
  const {disabled, onConfirm} = props
  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    onConfirm()
    event.stopPropagation()
  }
  return (
    <IconButton aria-label={dict('save').toLowerCase()} color="inherit" onClick={onClickHandler} disabled={disabled}>
      <SaveRoundedIcon/>
    </IconButton>
  )
}

export default SaveButton