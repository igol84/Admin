import {Box, Divider, Paper, Stack} from "@mui/material"
import React from "react"
import {ViewWidth} from "../../../types";
import {SelectedSize} from "./index";


interface WidthProps {
  color: string
  viewWidth: ViewWidth
  onSelectedSize: (idSize: SelectedSize) => void
  isSelectedSize: (idSize: number) => boolean
}

const Width = (props: WidthProps) => {
  const {color, viewWidth, onSelectedSize, isSelectedSize} = props

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
            :
            <Paper key={viewSize.prod_id}
                   sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1, backgroundColor: 'gray'}}>
              <Box>{viewSize.size}</Box>
              <Divider orientation="horizontal" flexItem/>
              <Box>{viewSize.qty}</Box>
            </Paper>

        })}
      </Stack>
    </Stack>

  )
}

export default Width