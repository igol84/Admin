import {ViewColor} from "../../types"
import React, {Dispatch, SetStateAction} from "react"
import Width from "./Width";

interface ColorSelected {
  name: string
  data: ViewColor
  selected: boolean
  setSelectedColor: Dispatch<SetStateAction<string | null>>
}

const Color = (props: ColorSelected) => {
  const {name, data, selected, setSelectedColor} = props
  const prices: Set<number> = new Set()
  data.widths.map(color => {
    return color.sizes.map(size => {
      prices.add(size.price)
    })
  })
  const price = prices.size === 1 ? [...prices][0].toString() : ''
  return (
    <>
      {data.widths.map((width, idRow) => {
        return <Width key={idRow} color={data.color} name={name} data={width} selected={selected}
                      setSelectedColor={setSelectedColor} priceWidth={price}/>
      })}
    </>

  )
}

export default Color