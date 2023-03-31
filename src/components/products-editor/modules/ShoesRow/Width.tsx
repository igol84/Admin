import {ViewWidth} from "../../types"
import {Box} from "@mui/material"
import React, {Dispatch, SetStateAction} from "react"
import Size from "./Size";
import ColorRow from "./ColorRow";
import ColorRowSelected from "./ColorRowSelected";

interface Width {
  name: string
  color: string
  data: ViewWidth
  selected: boolean
  setSelectedColor: Dispatch<SetStateAction<string | null>>
  priceWidth: string
}

const Width = (props: Width) => {
  const {name, color, data, selected, setSelectedColor, priceWidth} = props


  return (
    <Box className='color selected'>
      {selected
        ? <ColorRowSelected name={name} color={color} data={data} setSelectedColor={setSelectedColor}
                            priceWidth={priceWidth}/>
        : <ColorRow color={color} width={data.width} setSelectedColor={setSelectedColor}/>}
      {data.sizes.map((size, idRow) => {
        return <Size key={idRow} data={size}/>
      })}
    </Box>

  )
}

export default Width