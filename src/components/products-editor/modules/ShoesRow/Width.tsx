import {ViewWidth} from "../../types"
import {Box} from "@mui/material"
import React from "react"
import Size from "./Size";
import ColorRow from "./ColorRow";
import ColorRowSelected from "./ColorRowSelected";

interface Width {
  name: string
  color: string
  data: ViewWidth
  selected: boolean
  onSelectedColor: (value: string | null) => void
  colorPrice: string
}

const Width = (props: Width) => {
  const {name, color, data, selected, onSelectedColor, colorPrice} = props


  return (
    <Box className='color selected'>
      {selected
        ? <ColorRowSelected name={name} color={color} data={data} onSelectedColor={onSelectedColor}
                            colorPrice={colorPrice}/>
        : <ColorRow color={color} width={data.width} colorPrice={colorPrice} onSelectedColor={onSelectedColor}/>}
      {data.sizes.map((size, idRow) => {
        return <Size key={idRow} data={size}/>
      })}
    </Box>

  )
}

export default Width