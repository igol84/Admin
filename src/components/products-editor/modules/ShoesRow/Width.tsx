import {ViewWidth} from "../../types"
import {Box} from "@mui/material"
import React from "react"
import SizeRow from "./SizeRow";
import ColorRow from "./ColorRow";
import ColorRowSelected from "./ColorRowSelected";
import SizeRowSelected from "./SizeRowSelected";

interface WidthProps {
  name: string
  color: string
  viewWidth: ViewWidth
  selected: boolean
  onSelectedColor: (value: string | null) => void
  colorPrice: string
  onSelectedSize: (idSize: number | null) => void
  isSelectedSize: (idSize: number) => boolean
}

const Width = (props: WidthProps) => {
  const {name, color, viewWidth, selected, onSelectedColor, colorPrice, onSelectedSize, isSelectedSize} = props


  return (
    <Box className='color selected'>
      {selected
        ? <ColorRowSelected name={name} color={color} viewWidth={viewWidth} onSelectedColor={onSelectedColor}
                            colorPrice={colorPrice}/>
        : <ColorRow color={color} width={viewWidth.width} colorPrice={colorPrice} onSelectedColor={onSelectedColor}/>}
      {viewWidth.sizes.map((size) => {
        return isSelectedSize(size.prod_id)
          ? <SizeRowSelected key={size.prod_id} sizeData={size} onSelectedSize={onSelectedSize}/>
          : <SizeRow key={size.prod_id} sizeData={size}  onSelectedSize={onSelectedSize}/>
      })}
    </Box>

  )
}

export default Width