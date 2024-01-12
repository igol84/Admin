import React from 'react';
import CloseIcon from "@mui/icons-material/Close";
import {useDictionaryTranslate} from "../../hooks/pages";
import {IconButton} from "@mui/material";

interface CloseButtonProps {
  onClick: () => void
}

const CloseButton = (props: CloseButtonProps) => {
  const dict = useDictionaryTranslate('form')
  const {onClick} = props
  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick()
    event.stopPropagation()
  }
  return (
    <IconButton aria-label={dict('close').toLowerCase()} color="inherit" onClick={onClickHandler}>
      <CloseIcon/>
    </IconButton>
  )
}

export default CloseButton