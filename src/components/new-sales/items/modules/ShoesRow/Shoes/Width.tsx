import {Stack} from "@mui/material"
import {AnimatePresence} from "framer-motion";
import React from "react"
import {ViewWidth} from "../../../types";
import {SelectedSize} from "./index";
import Size from "./Size";
import HeaderColor from "./HeaderColor";
import HeaderColorSelected from "./HeaderColorSelected";
import {useDictionaryTranslate} from "../../../../../../hooks/pages";


interface WidthProps {
  color: string
  viewWidth: ViewWidth
  onSelectedSize: (idSize: SelectedSize) => void
  selectedSize: SelectedSize | null
  onResetSize: () => void
}

const Width = (props: WidthProps) => {
  const {color, viewWidth, onSelectedSize, selectedSize, onResetSize} = props

  const isSelectedSize = (idSize: number) => idSize === selectedSize?.id

  const onSizeClick = (selectedSize: SelectedSize) => {
    onSelectedSize(selectedSize)
  }

  const isSelected = () => viewWidth.sizes.find(size => isSelectedSize(size.prod_id))
  const d = useDictionaryTranslate('NewSales')
  return (
    <Stack className='color selected'>
      {selectedSize && isSelected()
        ? <HeaderColorSelected width={d(viewWidth.width)} color={color} onClose={onResetSize}
                               selectedSize={selectedSize}/>
        : <HeaderColor width={d(viewWidth.width)} color={color}/>
      }
      <Stack direction="row" gap={1} flexWrap='wrap'>
        <AnimatePresence>
          {viewWidth.sizes.map((viewSize) => {
            return <Size
              key={viewSize.prod_id} selected={isSelectedSize(viewSize.prod_id)} id={viewSize.prod_id}
              size={viewSize.size} qty={viewSize.qty} price={viewSize.price} onSizeClick={onSizeClick}
              onResetSize={onResetSize}
            />
          })}
        </AnimatePresence>
      </Stack>
    </Stack>

  )
}

export default Width