import React, {useState} from "react"
import {AnimatePresence, motion} from "framer-motion";
import {ViewShoes} from "../../../types"
import HeaderName from "./HeaderName";
import Color from "./Color";


interface ShoesFormProps {
  selected: boolean
  viewShoes: ViewShoes
  resetFormData: () => void
}

export interface SelectedSize {
  id: number
  price: number
}

const ShoesForm = (props: ShoesFormProps) => {
  const {selected, viewShoes, resetFormData} = props

  const [selectedSize, setSelectedSize] = useState<SelectedSize | null>(null)


  const onSelectedSize = (idSize: SelectedSize) => {
    setSelectedSize(idSize)
  }

  const onResetSize = () => {
    setSelectedSize(null)
  }
  const variantsHidden = {
    hidden: {height: 0, opacity: 0},
    showing: {height: 'auto', opacity: 1},
  }
  return (
    <>
      <AnimatePresence>
        <HeaderName selected={selected} name={viewShoes.name} onClose={resetFormData}/>
      </AnimatePresence>
      <AnimatePresence key='body'>
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
              <Color key={idRow} viewColor={color} onSelectedSize={onSelectedSize} selectedSize={selectedSize}
                     onResetSize={onResetSize}/>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </>
  )
}

export default ShoesForm