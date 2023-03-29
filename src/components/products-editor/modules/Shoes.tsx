import {ViewSimpleProduct} from "../types"
import {Box, Paper} from "@mui/material"
import {formatter} from "../../Form"
import React from "react"

interface Product {
  data: ViewSimpleProduct
  selected: boolean
  onSelect: () => void
}

const formatQty = (qty: number) => `${qty} шт.`

const SimpleProduct = (props: Product) => {
  const {data, selected = false} = props
  const className = selected ? 'selected' : ''
  const onSelect = !open ? () => {
    console.log(data)
  } : () => undefined
  return (
    <Paper className={className} sx={{p: 1}} onClick={onSelect}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
        <Box sx={{width: "250px"}}>{data.name}</Box>
        <Box sx={{width: "80px"}}>{formatQty(data.qty)}</Box>
        <Box sx={{width: "150px", textAlign: 'right'}}>{formatter.format(data.price)}</Box>
      </Box>
    </Paper>
  )
}

export default SimpleProduct