import {Box, Divider, Paper, Stack} from "@mui/material"
import React from "react"
import {ViewWidth} from "../../../types";
import {SelectedSize} from "./index";
import Size from "./Size";


interface WidthProps {
  color: string
  viewWidth: ViewWidth
  onSelectedSize: (idSize: SelectedSize) => void
  isSelectedSize: (idSize: number) => boolean
}

const Width = (props: WidthProps) => {
  const {color, viewWidth, onSelectedSize, isSelectedSize} = props

  const onSizeClick = (id: number) => {
    console.log(id)
  }

  return (
    <Stack className='color selected'>
      <Box className='color-row'>
        <Box>{color}</Box>
        <Box>{viewWidth.width}</Box>
      </Box>
      <Stack
        direction="row"
        spacing={1}
      >
        {viewWidth.sizes.map((viewSize) => {
          return isSelectedSize(viewSize.prod_id)
            ? <Box>{viewSize.size}: {viewSize.qty}</Box>
            : <Size key={viewSize.prod_id} id={viewSize.prod_id} size={viewSize.size}
                    qty={viewSize.qty} onSizeClick={onSizeClick}/>

        })}
      </Stack>
    </Stack>

  )
}

export default Width