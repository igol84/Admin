import {ViewWidth} from "../../types"
import {Box} from "@mui/material"
import React, {useState} from "react"
import Size from "./Size";

interface Width {
  name: string
  data: ViewWidth
  selected: boolean
}

const Width = (props: Width) => {
  const {name, data, selected} = props
  const [selectedWidthRow, setSelectedWidthRow] = useState<number | null>(null)
  const isSelected = (idRow: number) => idRow === selectedWidthRow
  const onSelect = () => {
    console.log(name, data.width)
  }

  return (
    <Box className='color selected'>
      <Box sx={{width: "250px"}}>{data.width}</Box>
      {data.sizes.map((size, idRow) => {
        return <Size key={idRow} data={size} selected={!isSelected(idRow)}/>
      })}
    </Box>

  )
}

export default Width