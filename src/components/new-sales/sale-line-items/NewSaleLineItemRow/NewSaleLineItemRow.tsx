import React, {useContext} from 'react';
import {Box, Paper} from "@mui/material";
import {ViewNewSaleLineItem} from "../types";
import {formatter} from "../../../Form";
import {LanguageModeContext} from "../../../../language";
import {useDictionaryTranslate} from "../../../../hooks/pages";

interface NewSaleLineItemRow {
  viewNewSaleLineItem: ViewNewSaleLineItem
  omSelectedRow: () => void
}

const NewSaleLineItemRow = (props: NewSaleLineItemRow) => {
  const {viewNewSaleLineItem, omSelectedRow} = props
  const {language} = useContext(LanguageModeContext)
  const d = useDictionaryTranslate('NewSales')
  return (
    <Paper className='product' onClick={omSelectedRow}>
      <Box sx={{minWidth: '250px', whiteSpace: 'nowrap', mr: 2}}>{viewNewSaleLineItem.name}</Box>
      <Box sx={{width: '80px'}}>{viewNewSaleLineItem.qty} {d('pc')}</Box>
      <Box sx={{flex: '1'}}></Box>
      <Box sx={{width: '100px'}}>{formatter(language).format(viewNewSaleLineItem.price)}</Box>
      <Box sx={{width: '150px'}}></Box>
    </Paper>
  );
};

export default NewSaleLineItemRow;