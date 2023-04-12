import {ViewShoes} from "../../../types"
import {Box, Paper} from "@mui/material"
import React, {useState} from "react"
import HeaderName from "./HeaderName";
import Color from "./Color";


interface ShoesFormProps {
  viewShoes: ViewShoes
  resetFormData: () => void
}

export interface SelectedSize {
  id: number
  price: number
}

const ShoesForm = (props: ShoesFormProps) => {
  const {viewShoes, resetFormData} = props

  const [selectedSize, setSelectedSize] = useState<SelectedSize | null>(null)


  const onSelectedSize = (idSize: SelectedSize) => {
    setSelectedSize(idSize)
  }

  const onResetSize = () => {
    setSelectedSize(null)
  }


  return (
    <Paper className='shoes'>
      <Box className='header'>
        <HeaderName name={viewShoes.name} onClose={resetFormData}/>
      </Box>
      <Box className='body'>
        {viewShoes.colors.map((color, idRow) => {
          return <Color key={idRow} viewColor={color} onSelectedSize={onSelectedSize} selectedSize={selectedSize}
                        onResetSize={onResetSize}/>
        })}
      </Box>
    </Paper>
  )
}

export default ShoesForm