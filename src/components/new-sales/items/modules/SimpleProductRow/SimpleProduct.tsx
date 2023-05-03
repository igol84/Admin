import {ViewSimpleProduct} from "./types";
import {Box} from "@mui/material";
import {formatter} from "../../../../Form";
import {useContext} from "react";
import {LanguageModeContext} from "../../../../../language";


interface Product {
  viewSimpleProduct: ViewSimpleProduct
}

export const SimpleProduct = (props: Product) => {
  const {viewSimpleProduct} = props
  const {language} = useContext(LanguageModeContext)


  return (
    <>
      <Box sx={{width: '250px'}}>{viewSimpleProduct.name}</Box>
      <Box sx={{width: '80px'}}>{`${viewSimpleProduct.qty} `}</Box>
      <Box sx={{flex: '1'}}></Box>
      <Box sx={{width: '100px'}}>{formatter(language).format(viewSimpleProduct.price)}</Box>
      <Box sx={{width: '150px'}}></Box>
    </>
  )
}

export default SimpleProduct