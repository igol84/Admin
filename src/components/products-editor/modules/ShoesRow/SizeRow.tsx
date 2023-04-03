import {ViewSize} from "../../types"
import {Box, Paper} from "@mui/material"
import React from "react"

interface SizeRowProps {
  sizeData: ViewSize
  onSelectedSize: (idSize: number | null) => void
}

const SizeRow = (props: SizeRowProps) => {
  const {sizeData, onSelectedSize} = props
  const onClick = () => {
    onSelectedSize(sizeData.prod_id)
  }
  return (
    <Paper className='size' onClick={onClick}>
      <Box sx={{width: "80px"}}>{sizeData.size}</Box>
      <Box sx={{width: "80px"}}>{sizeData.length}</Box>
      <Box sx={{width: "100px"}}>{sizeData.qty}</Box>
      <Box sx={{width: "100px"}}>{sizeData.price}</Box>
      <Box sx={{flex: 1}}></Box>
      <Box sx={{width: "100px"}}></Box>
    </Paper>
  )
}

export default SizeRow