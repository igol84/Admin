import React from 'react';
import {GridActionsCellItem} from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import {useDictionaryTranslate} from "../../hooks/pages";

interface CloseButtonProps {
  onClick: () => void
}

const CloseButton = (props: CloseButtonProps) => {
  const dict = useDictionaryTranslate('form')
  const {onClick} = props
  return (
    <GridActionsCellItem icon={<CloseIcon/>} label={dict('close').toLowerCase()} onClick={onClick} color="inherit"/>
  )
}

export default CloseButton