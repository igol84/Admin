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
      <Box sx={{width: "250px"}}>{sizeData.size}</Box>
      <Box sx={{width: "250px"}}>{sizeData.length}</Box>
      <Box sx={{width: "250px"}}>{sizeData.qty}</Box>
      <Box sx={{width: "250px"}}>{sizeData.price}</Box>
      <Box sx={{width: "250px"}}></Box>
    </Paper>
  )
}

export default SizeRow