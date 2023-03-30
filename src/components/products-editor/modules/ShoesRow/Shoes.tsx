import {ViewShoes} from "../../types"
import {Box, Paper} from "@mui/material"
import React from "react"

interface Shoes {
  data: ViewShoes
  onSelect: () => void
}

const Shoes = (props: Shoes) => {
  const {data, onSelect} = props
  return (
    <Paper sx={{p: 1}} onClick={onSelect}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
        <Box sx={{width: "250px"}}>{data.name}</Box>
      </Box>
    </Paper>
  )
}

export default Shoes