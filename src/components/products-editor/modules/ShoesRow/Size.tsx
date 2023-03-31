import {ViewSize} from "../../types"
import {Box, Paper} from "@mui/material"
import React, {useState} from "react"

interface ColorSelected {
  data: ViewSize
  selected: boolean
}

const Size = (props: ColorSelected) => {
  const {data, selected} = props
  const [selectedSizeRow, setSelectedSizeRow] = useState<number | null>(null)
  const isSelected = (idRow: number) => idRow === selectedSizeRow
  const onSelect = () => {
    console.log(data.size)
  }

  return (
    <Paper className='color' onClick={onSelect}>
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