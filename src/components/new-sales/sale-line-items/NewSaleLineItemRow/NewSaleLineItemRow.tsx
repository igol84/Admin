import React, {useContext} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {Box, useTheme} from "@mui/material";
import {ViewNewSaleLineItem} from "../types";
import {useForm} from "./NewSaleLineItemRow.hooks";
import {formatter, SimpleField} from "../../../Form";
import {GridActionsCellItem} from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {LanguageModeContext} from "../../../../language";
import {useDictionaryTranslate} from "../../../../hooks/pages";
import {tokens} from "../../../../theme";

interface NewSaleLineItemRow {
  selected: boolean
  viewNewSaleLineItem: ViewNewSaleLineItem
  onSelectedRow: () => void
  resetSelectedRow: () => void
}

const NewSaleLineItemRowSelected = (props: NewSaleLineItemRow) => {
  const {selected, viewNewSaleLineItem, onSelectedRow, resetSelectedRow} = props
  const [formData, useError, onPriceFieldChange, onConfirm, onRemove] = useForm(viewNewSaleLineItem, resetSelectedRow)
  const {language} = useContext(LanguageModeContext)
  const d = useDictionaryTranslate('NewSales')
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const onClick = selected ? () => undefined : onSelectedRow
  const className = `paper product ${selected ? 'selected' : ''}`
  const priceCell = selected ?
    <SimpleField
      type='number' name='price' value={formData.price.value.toString()} setValue={onPriceFieldChange}
      error={useError('price')} fullWidth={false} variant={'standard'}/>
    : formatter(language).format(viewNewSaleLineItem.price)
  const buttonsCell = selected &&
    <motion.div className='buttons' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <Box>
        <GridActionsCellItem icon={<CheckIcon/>} label={'Check'} onClick={onConfirm}/>
        <GridActionsCellItem icon={<DeleteIcon/>} label={'Remove'} onClick={onRemove}/>
      </Box>
      <GridActionsCellItem icon={<CloseIcon/>} label={'Remove'} onClick={resetSelectedRow}/>
    </motion.div >
  const variantsColors = {
    initial: {height: 0, opacity: 0},
    default: {height: 'auto', opacity: 1, x: 0, backgroundColor: colors.blueAccent[700]},
    selected: {height: 0, opacity: 1, x: 3, backgroundColor: colors.blueAccent[800]},
  }
  const layoutId = `${viewNewSaleLineItem.prod_id}-${viewNewSaleLineItem.price}`
  return (
    <motion.div
      className={className} onClick={onClick} key={layoutId}
      layoutId={layoutId} variants={variantsColors}
      initial={'initial'} animate={selected ? 'selected' : 'default'}
      whileHover={selected ? {} : 'selected'}
      exit='initial'
    >
      <Box sx={{width: '250px'}}>{viewNewSaleLineItem.name}</Box>
      <Box sx={{width: '80px'}}>{viewNewSaleLineItem.qty} {d('pc')}</Box>
      <Box sx={{width: '100px'}} className='push'>{priceCell}</Box>
      <Box sx={{width: '150px'}}><AnimatePresence>{buttonsCell}</AnimatePresence></Box>
    </motion.div>
  );
};

export default NewSaleLineItemRowSelected;