import {ViewSimpleProduct} from "../../types"
import {Box, Paper} from "@mui/material"
import {formatter} from "../../../Form"
import React from "react"


interface Product {
  data: ViewSimpleProduct
  onSelect: () => void
}

export const SimpleProduct = (props: Product) => {
  const {data, onSelect} = props
  return (
    <Paper className='product' onClick={onSelect}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
        <Box sx={{width: '250px'}}>{data.name}</Box>
        <Box sx={{width: '80px'}}>{`${data.qty} шт.`}</Box>
        <Box sx={{flex: '1'}}></Box>
        <Box sx={{width: '100px'}}>{formatter.format(data.price)}</Box>
        <Box sx={{width: '150px'}}></Box>
      </Box>
    </Paper>
  )
}

export default SimpleProduct