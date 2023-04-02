import {ViewShoes} from "../../types"
import {Box, Paper} from "@mui/material"
import React from "react"

interface Shoes {
  viewShoes: ViewShoes
  onSelect: () => void
}

const Shoes = (props: Shoes) => {
  const {viewShoes, onSelect} = props
  return (
    <Paper className='product' onClick={onSelect}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
        <Box sx={{width: "250px"}}>{viewShoes.name}</Box>
      </Box>
    </Paper>
  )
}

export default Shoes