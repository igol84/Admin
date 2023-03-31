import {ViewColor} from "../../types"
import {Box} from "@mui/material"
import React, {useState} from "react"
import Width from "./Width";

interface ColorSelected {
  name: string
  data: ViewColor
  selected: boolean
}

const Color = (props: ColorSelected) => {
  const {name, data, selected} = props
  const [selectedWidthRow, setSelectedWidthRow] = useState<number | null>(null)
  const isSelected = (idRow: number) => idRow === selectedWidthRow
  const onSelect = () => {
    console.log(name)
  }

  return (

    <Box className='color selected'>
      <Box sx={{width: "250px"}}>{data.color}</Box>
      {data.widths.map((width, idRow) => {
        return <Width key={idRow} name={name} data={width} selected={!isSelected(idRow)}/>
      })}
    </Box>

  )
}

export default Color