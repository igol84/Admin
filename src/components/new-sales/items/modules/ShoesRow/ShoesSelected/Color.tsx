import React from "react"
import {ViewColor} from "../../../types";
import {SelectedSize} from "./index";
import {Box} from "@mui/material";
import Width from "./Width";


interface ColorProps {

  viewColor: ViewColor
  onSelectedSize: (idSize: SelectedSize) => void
  isSelectedSize: (idSize: number) => boolean
}

const Color = (props: ColorProps) => {
  const {viewColor, onSelectedSize, isSelectedSize} = props

  return (
    <Box>
      {viewColor.widths.map((width, idRow) => {
        return <Width key={idRow} color={viewColor.color} viewWidth={width} onSelectedSize={onSelectedSize}
                      isSelectedSize={isSelectedSize}/>
      })}
    </Box>
  )
}

export default Color