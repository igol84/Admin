import {ViewColor} from "../../types"
import React from "react"
import Width from "./Width";

interface ColorProps {
  name: string
  viewColor: ViewColor
  selectedColor: boolean
  onSelectedColor: (value: string | null) => void
  onSelectedSize: (idSize: number | null) => void
  isSelectedSize: (idSize: number) => boolean
}

const Color = (props: ColorProps) => {
  const {name, viewColor, selectedColor, onSelectedColor, onSelectedSize, isSelectedSize} = props
  const colorPrices: Set<number> = new Set()
  viewColor.widths.map(color => {
    return color.sizes.map(size => {
      colorPrices.add(size.price)
    })
  })
  const colorPrice = colorPrices.size === 1 ? [...colorPrices][0].toString() : ''
  return (
    <>
      {viewColor.widths.map((width, idRow) => {
        return <Width key={idRow} color={viewColor.color} name={name} viewWidth={width} selected={selectedColor}
                      onSelectedColor={onSelectedColor} colorPrice={colorPrice} onSelectedSize={onSelectedSize}
                      isSelectedSize={isSelectedSize}/>
      })}
    </>

  )
}

export default Color