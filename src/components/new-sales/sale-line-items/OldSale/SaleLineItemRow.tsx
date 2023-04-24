import React, {useContext} from 'react';
import {Box} from "@mui/material";
import {ViewSaleLineItem} from "../types";
import {formatter} from "../../../Form";
import {LanguageModeContext} from "../../../../language";
import {useDictionaryTranslate} from "../../../../hooks/pages";

interface SaleLineItemRowProps {
  viewSaleLineItem: ViewSaleLineItem
  omSelectedRow: () => void
}

const SaleLineItemRow = ({viewSaleLineItem, omSelectedRow}: SaleLineItemRowProps) => {
  const {language} = useContext(LanguageModeContext)
  const d = useDictionaryTranslate('NewSales')
  return (
    <Box className='item' onClick={omSelectedRow}>
      <Box width='300px'>{viewSaleLineItem.name}</Box>
      <Box width='150px'>{formatter(language).format(viewSaleLineItem.salePrice)}</Box>
      <Box width='50px'>{viewSaleLineItem.qty} {d('pc')}</Box>
      <Box flex={1}></Box>
      <Box width='150px'></Box>
    </Box>
  );
};

export default SaleLineItemRow;