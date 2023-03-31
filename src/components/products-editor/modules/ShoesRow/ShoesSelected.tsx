import {ViewShoes} from "../../types"
import {Paper} from "@mui/material"
import React, {useState} from "react"
import Color from "./Color";
import NameRow from "./NameRow";
import NameRowSelected from "./NameRowSelected";

interface ShoesSelected {
  data: ViewShoes
  resetFormData: () => void
}

const ShoesForm = (props: ShoesSelected) => {
  const {data, resetFormData} = props

  const [selectedNameForm, setSelectedNameForm] = useState<boolean>(false)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const onSelectedNameForm = (flag: boolean) => {
    setSelectedColor(null)
    setSelectedNameForm(flag)
  }

  const onSelectedColor = (color: string | null) => {
    setSelectedNameForm(false)
    setSelectedColor(color)
  }
  const isSelected = (idRow: string) => idRow === selectedColor

  const shoesPrices: Set<number> = new Set()
  data.colors.map(color => {
    return color.widths.map(width => {
      return width.sizes.map(size => {
        shoesPrices.add(size.price)
      })
    })
  })

  const shoesPrice = shoesPrices.size === 1 ? [...shoesPrices][0].toString() : ''

  return (
    <Paper className='selected' sx={{p: 1}}>

      {selectedNameForm
        ? <NameRowSelected data={data} onSelectedNameForm={onSelectedNameForm}/>
        : <NameRow name={data.name} shoesPrice={shoesPrice} onSelectedNameForm={onSelectedNameForm}
                   resetFormData={resetFormData}/>}
      {data.colors.map((color, idRow) => {
        return <Color key={idRow} name={data.name} data={color} selected={isSelected(color.color)}
                      onSelectedColor={onSelectedColor}/>
      })}
    </Paper>
  )
}

export default ShoesForm