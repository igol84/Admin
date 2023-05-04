import React, {useContext} from 'react';
import {Box, useTheme} from "@mui/material";
import {AnimatePresence, motion} from "framer-motion";
import {useForm} from "./SaleLineItemRow.hooks";
import {formatter, SimpleField} from "../../../Form";
import {GridActionsCellItem} from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import CloseButton from "../../../Form/CloseButton";
import {ViewSaleLineItem} from "../types";
import DeleteButton from "../../../Form/DeleteButton";
import {useDictionaryTranslate} from "../../../../hooks/pages";
import {LanguageModeContext} from "../../../../language";
import {tokens} from "../../../../theme";


interface SaleLineItemRowSelectedProps {
  selected: boolean
  omSelectedRow: () => void
  viewSaleLineItem: ViewSaleLineItem
  resetSelectedRow: () => void
}

const SaleLineItemRow = (props: SaleLineItemRowSelectedProps) => {
  const {selected, omSelectedRow, viewSaleLineItem, resetSelectedRow} = props
  const [formData, useError, onPriceFieldChange, onConfirm, onRemove] = useForm(viewSaleLineItem, resetSelectedRow)
  const d = useDictionaryTranslate('NewSales')
  const {language} = useContext(LanguageModeContext)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const onClick = selected ? () => undefined : omSelectedRow
  const className = `item ${selected ? 'selected' : ''}`
  const priceCell = selected ?
    <SimpleField
      type='number' name='price' value={formData.price.value.toString()} setValue={onPriceFieldChange}
      error={useError('price')} fullWidth={false} variant={'standard'}/>
    : formatter(language).format(viewSaleLineItem.salePrice)
  const buttonsCell = selected &&
    <motion.div className='buttons' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <Box>
        <GridActionsCellItem icon={<CheckIcon/>} label={'Check'} onClick={onConfirm}/>
        <DeleteButton deletable={true} onRemove={onRemove}/>
      </Box>
      <CloseButton onClick={resetSelectedRow}/>
    </motion.div>
  const variantsColors = {
    initial: {opacity: 0, backgroundColor: colors.blueAccent[700]},
    default: {opacity: 1, backgroundColor: colors.blueAccent[700]},
    selected: {opacity: 1, backgroundColor: colors.blueAccent[800]},
  }
  const layoutId = `${viewSaleLineItem.saleId}-${viewSaleLineItem.productId}-${viewSaleLineItem.salePrice}`
  return (
    <motion.div
      className={className} onClick={onClick} key={layoutId} variants={variantsColors}
      initial={false} animate={selected ? 'selected' : 'default'}
      whileHover={selected ? {} : 'selected'}
      exit='initial'
    >
      <Box width='300px'>{viewSaleLineItem.name}</Box>
      <Box width='100px'>{priceCell}</Box>
      <Box width='50px'>{viewSaleLineItem.qty} {d('pc')}</Box>
      <Box width='150px' className='push'>
        <AnimatePresence>{buttonsCell}</AnimatePresence>
      </Box>
    </motion.div>
  );
};

export default SaleLineItemRow;