import React from "react"
import {ViewColor} from "../../../types";
import {SelectedSize} from "./index";
import {Box} from "@mui/material";
import Width from "./Width";


interface ColorProps {
  viewColor: ViewColor
  onSelectedSize: (idSize: SelectedSize) => void
  selectedSize: SelectedSize | null
  onResetSize: () => void
}

const Color = (props: ColorProps) => {
  const {viewColor, onSelectedSize, selectedSize, onResetSize} = props

  return (
    <Box>
      {viewColor.widths.map((width, idRow) => {
        return <Width key={idRow} color={viewColor.color} viewWidth={width} onSelectedSize={onSelectedSize}
                      selectedSize={selectedSize} onResetSize={onResetSize} />
      })}
    </Box>
  )
}

export default Color