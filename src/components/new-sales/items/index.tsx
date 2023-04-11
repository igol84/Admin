import React, {useState} from 'react';
import {Box, Stack} from "@mui/material";
import {ViewProduct} from "./types";
import {Module} from "../../products-editor/types";
import {useStyle} from "./style";
import SimpleProduct from "./modules/SimpleProductRow/SimpleProduct";
import SimpleProductSelected from "./modules/SimpleProductRow/SimpleProductSelected";
import Shoes from "./modules/ShoesRow/Shoes";
import ShoesSelected from "./modules/ShoesRow/ShoesSelected";
import SearchInput from "../../Form/SearchInput";


interface ItemsProps {
  viewProducts: ViewProduct[]
}

const Items = (props: ItemsProps) => {
  const {viewProducts} = props

  const style = useStyle()
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null)
  const [search, setSearch] = useState<string>('')
  const onSelect = (rowIdx: number) => () => {
    setSelectedRowId(rowIdx)
  }
  const isSelected = (rowIdx: number) => rowIdx === selectedRowId
  const resetSelectedRow = () => {
    setSelectedRowId(null)
  }
  const searchRowsByName = (row: ViewProduct) => row.name.toUpperCase().includes(search.toUpperCase())
  const searchedProductsData = viewProducts.slice().filter(searchRowsByName)
  const onSearch = (value: string) => {
    setSearch(value)
    resetSelectedRow()
  }
  return (
    <Box sx={style}>
      <SearchInput value={search} setValue={onSearch}/>
      <Stack className='items'>
        {searchedProductsData.map((viewProduct, rowId) => {
          switch (viewProduct.module) {
            case Module.product:
              return isSelected(rowId)
                ? <SimpleProductSelected key={rowId} viewSimpleProduct={viewProduct} resetFormData={resetSelectedRow}/>
                : <SimpleProduct key={rowId} viewSimpleProduct={viewProduct} onSelect={onSelect(rowId)}/>
            case Module.shoes:
              return isSelected(rowId)
                ? <ShoesSelected key={rowId} viewShoes={viewProduct} resetFormData={resetSelectedRow}/>
                : <Shoes key={rowId} viewShoes={viewProduct} onSelect={onSelect(rowId)}/>
          }
        })}
      </Stack>
    </Box>
  )
};

export default Items;