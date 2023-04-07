import {ViewShoes} from "../../../types"
import {Box, Paper} from "@mui/material"
import React, {useState} from "react"
import HeaderSelected from "./HeaderSelected";
import Header from "./Header";
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
  const isSelectedSize = (idSize: number) => idSize === selectedSize?.id

  const onClose = () => {
    setSelectedSize(null)
  }


  return (
    <Paper className='shoes'>
      <Box className='header'>
        {selectedSize === null
          ? <Header name={viewShoes.name}/>
          : <HeaderSelected name={viewShoes.name} selectedSize={selectedSize} onClose={onClose}/>}
      </Box>
      <Box className='body'>
        {viewShoes.colors.map((color, idRow) => {
          return <Color key={idRow} viewColor={color} onSelectedSize={onSelectedSize}
                        isSelectedSize={isSelectedSize}/>
        })}
      </Box>
    </Paper>
  )
}

export default ShoesForm