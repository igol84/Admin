import {ViewSize} from "../../types"
import {Box, Paper} from "@mui/material"
import React from "react"
import {GridActionsCellItem} from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";

interface SizeRowSelectedProps {
  sizeData: ViewSize
  onSelectedSize: (idSize: number | null) => void
}

const SizeRowSelected = (props: SizeRowSelectedProps) => {
  const {sizeData, onSelectedSize} = props
  const onClickClose = () => {
    onSelectedSize(null)
  }

  const buttonsCell =
    <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
      <GridActionsCellItem icon={<CloseIcon/>} label={'close'} onClick={onClickClose} color="inherit"/>
    </Box>
  return (
    <Paper className='size selected'>
      <Box sx={{width: "250px"}}>{sizeData.size}</Box>
      <Box sx={{width: "250px"}}>{sizeData.price}</Box>
      <Box sx={{width: "250px"}}>{sizeData.qty}</Box>
      <Box sx={{width: "250px"}}>{sizeData.length}</Box>
      <Box sx={{width: "250px"}}>{buttonsCell}</Box>
    </Paper>
  )
}

export default SizeRowSelected