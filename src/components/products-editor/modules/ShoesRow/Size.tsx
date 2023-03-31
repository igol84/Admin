import {ViewSize} from "../../types"
import {Box, Paper} from "@mui/material"
import React from "react"

interface ColorSelected {
  data: ViewSize
}

const Size = (props: ColorSelected) => {
  const {data} = props

  return (
    <Paper className='color'>
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
        <Box sx={{width: "250px"}}>{data.size}</Box>
        <Box sx={{width: "250px"}}>{data.price}</Box>
        <Box sx={{width: "250px"}}>{data.qty}</Box>
        <Box sx={{width: "250px"}}>{data.length}</Box>
      </Box>
    </Paper>
  )
}

export default Size