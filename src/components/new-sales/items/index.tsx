import React, {useState} from 'react';
import {Box, Stack} from "@mui/material";
import {ViewProduct} from "./types";
import {Module} from "../../products-editor/types";
import {useStyle} from "./style";
import SimpleProduct from "./modules/SimpleProductRow/SimpleProduct";
import SimpleProductSelected from "./modules/SimpleProductRow/SimpleProductSelected";
import Shoes from "./modules/ShoesRow/Shoes";
import ShoesSelected from "./modules/ShoesRow/ShoesSelected";


interface ItemsProps {
  viewProducts: ViewProduct[]
}

const Items = (props: ItemsProps) => {
  const {viewProducts} = props

  const style = useStyle()
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null)
  const onSelect = (rowIdx: number) => () => {
    setSelectedRowId(rowIdx)
  }
  const isSelected = (rowIdx: number) => rowIdx === selectedRowId
  const resetFormData = () => {
    setSelectedRowId(null)
  }
  return (
    <Box sx={style}>
      <Stack className='items'>
        {viewProducts.map((viewProduct, rowId) => {
          switch (viewProduct.module) {
            case Module.product:
              return isSelected(rowId)
                ? <SimpleProductSelected key={rowId} viewSimpleProduct={viewProduct} resetFormData={resetFormData}/>
                : <SimpleProduct key={rowId} viewSimpleProduct={viewProduct} onSelect={onSelect(rowId)}/>
            case Module.shoes:
              return isSelected(rowId)
                ? <ShoesSelected key={rowId} viewShoes={viewProduct} resetFormData={resetFormData}/>
                : <Shoes key={rowId} viewShoes={viewProduct} onSelect={onSelect(rowId)}/>
          }
        })}
      </Stack>
    </Box>
  );
};

export default Items;