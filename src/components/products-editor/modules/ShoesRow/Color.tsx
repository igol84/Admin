import {ViewColor} from "../../types"
import React from "react"
import Width from "./Width";

interface ColorSelected {
  name: string
  data: ViewColor
  selected: boolean
  onSelectedColor: (value: string | null) => void
}

const Color = (props: ColorSelected) => {
  const {name, data, selected, onSelectedColor} = props
  const colorPrices: Set<number> = new Set()
  data.widths.map(color => {
    return color.sizes.map(size => {
      colorPrices.add(size.price)
    })
  })
  const colorPrice = colorPrices.size === 1 ? [...colorPrices][0].toString() : ''
  return (
    <>
      {data.widths.map((width, idRow) => {
        return <Width key={idRow} color={data.color} name={name} data={width} selected={selected}
                      onSelectedColor={onSelectedColor} colorPrice={colorPrice}/>
      })}
    </>

  )
}

export default Color