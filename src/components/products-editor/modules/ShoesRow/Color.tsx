import {ViewColor} from "../../types"
import {Box, Paper} from "@mui/material"
import React from "react"

interface ColorSelected {
  data: ViewColor
}

const Color = (props: ColorSelected) => {
  const {data} = props

  const onSelect = () => {
    console.log(data)
  }

  return (
    <Paper className='color' onClick={onSelect}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
        <Box sx={{width: "250px"}}>{data.color}</Box>
      </Box>
    </Paper>
  )
}

export default Color