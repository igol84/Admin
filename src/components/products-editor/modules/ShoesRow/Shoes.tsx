import {ViewShoes} from "../../types"
import {Box} from "@mui/material"
import React, {useState} from "react"
import NameRowSelected from "./NameRowSelected";
import NameRow from "./NameRow";
import {AnimatePresence, motion} from "framer-motion";
import Color from "./Color";

interface Shoes {
  selected: boolean
  viewShoes: ViewShoes
  resetSelectedRow?: () => void
}

const Shoes = (props: Shoes) => {
  const {selected, viewShoes, resetSelectedRow = () => undefined} = props

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

  const onResetSelectedRow = () => {
    setSelectedNameForm(false)
    resetSelectedRow()
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

  const variantsHidden = {
    hidden: {height: 0, opacity: 0},
    showing: {height: 'auto', opacity: 1},
  }

  const header = selected ? selectedNameForm
      ? <NameRowSelected viewShoes={viewShoes} onSelectedNameForm={onSelectedNameForm}/>
      : <NameRow name={viewShoes.name} shoesPrice={shoesPrice} onSelectedNameForm={onSelectedNameForm}
                 resetSelectedRow={onResetSelectedRow}/>
    : <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
      <Box sx={{width: "250px"}}>{viewShoes.name}</Box>
    </Box>

  return (
    <>
      {header}
      <AnimatePresence>
        {selected && viewShoes.colors.map((color, idRow) => {
          return (
            <motion.div
              key={idRow}
              layoutId={idRow.toString()}
              style={{overflow: 'hidden'}}
              className='collapsible-content'
              initial='hidden'
              variants={variantsHidden}
              animate='showing'
              exit='hidden'
            >
              <Color name={viewShoes.name} viewColor={color} selectedColor={isSelectedColor(color.color)}
                     onSelectedColor={onSelectedColor} onSelectedSize={onSelectedSize}
                     isSelectedSize={isSelectedSize}/>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </>
  )
}

export default Shoes