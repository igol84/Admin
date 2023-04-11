import {ViewShoes} from "../../types"
import {Paper} from "@mui/material"
import React, {useState} from "react"
import Color from "./Color";
import NameRow from "./NameRow";
import NameRowSelected from "./NameRowSelected";

interface ShoesFormProps {
  viewShoes: ViewShoes
  resetSelectedRow: () => void
}

const ShoesForm = (props: ShoesFormProps) => {
  const {viewShoes, resetSelectedRow} = props

  const [selectedNameForm, setSelectedNameForm] = useState<boolean>(false)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedShoesRow, setSelectedShoesRow] = useState<number | null>(null)


  const onSelectedNameForm = (flag: boolean) => {
    setSelectedNameForm(flag)
    setSelectedColor(null)
    setSelectedShoesRow(null)
  }

  const onSelectedColor = (color: string | null) => {
    setSelectedNameForm(false)
    setSelectedColor(color)
    setSelectedShoesRow(null)
  }

  const onSelectedSize = (idSize: number | null) => {
    setSelectedColor(null)
    setSelectedNameForm(false)
    setSelectedShoesRow(idSize)
  }
  const isSelectedColor = (idRow: string) => idRow === selectedColor
  const isSelectedSize = (idSize: number) => idSize === selectedShoesRow

  const shoesPrices: Set<number> = new Set()
  viewShoes.colors.map(color => {
    return color.widths.map(width => {
      return width.sizes.map(size => {
        shoesPrices.add(size.price)
      })
    })
  })

  const shoesPrice = shoesPrices.size === 1 ? [...shoesPrices][0].toString() : ''

  return (
    <Paper className='product selected' sx={{p: 1}}>

      {selectedNameForm
        ? <NameRowSelected viewShoes={viewShoes} onSelectedNameForm={onSelectedNameForm}/>
        : <NameRow name={viewShoes.name} shoesPrice={shoesPrice} onSelectedNameForm={onSelectedNameForm}
                   resetSelectedRow={resetSelectedRow}/>}
      {viewShoes.colors.map((color, idRow) => {
        return <Color key={idRow} name={viewShoes.name} viewColor={color} selectedColor={isSelectedColor(color.color)}
                      onSelectedColor={onSelectedColor} onSelectedSize={onSelectedSize}
                      isSelectedSize={isSelectedSize}/>
      })}
    </Paper>
  )
}

export default ShoesForm