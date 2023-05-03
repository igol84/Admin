import React, {useState} from 'react';
import {Box, Stack, useTheme} from "@mui/material";
import {motion} from "framer-motion";
import {ViewProduct} from "./types";
import {Module} from "../../products-editor/types";
import {useStyle} from "./style";
import SimpleProduct from "./modules/SimpleProductRow/SimpleProduct";
import SimpleProductSelected from "./modules/SimpleProductRow/SimpleProductSelected";
import Shoes from "./modules/ShoesRow/Shoes";
import SearchInput from "../../Form/SearchInput";
import {tokens} from "../../../theme";


interface ItemsProps {
  viewProducts: ViewProduct[]
}

const Items = (props: ItemsProps) => {
  const {viewProducts} = props
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
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
  const variantsColors = {
    blue: {backgroundColor: colors.blueAccent[700]},
    darkBlue: {backgroundColor: colors.blueAccent[800]},
    hover: {x: 3, backgroundColor: colors.blueAccent[800]}
  }
  return (
    <Box sx={style}>
      <SearchInput value={search} setValue={onSearch}/>
      <Stack className='items'>
        {searchedProductsData.map((viewProduct, rowId) => {
          switch (viewProduct.module) {
            case Module.product:
              return isSelected(rowId)
                ? <SimpleProductSelected key={rowId} viewSimpleProduct={viewProduct}
                                         resetSelectedRow={resetSelectedRow}/>
                : <SimpleProduct key={rowId} viewSimpleProduct={viewProduct}/>
            case Module.shoes:
              return <Shoes key={rowId} selected={isSelected(rowId)} viewShoes={viewProduct}
                                    resetFormData={resetSelectedRow}/>

          }
        }).map((component, rowId) => {
          const componentName = searchedProductsData[rowId].module === Module.shoes ? 'shoes' : 'product'
          const className = `paper ${componentName}${isSelected(rowId) ? ' selected' : ''}`
          return (
            <motion.div
              key={rowId} className={className} onClick={isSelected(rowId) ? () => undefined : onSelect(rowId)}
              variants={variantsColors}
              initial={isSelected(rowId) ? {} : 'darkBlue'}
              animate={isSelected(rowId) ? {} : 'blue'}
              whileHover={isSelected(rowId) ? {} : 'hover'}
            >
              {component}
            </motion.div>
          )
        })}
      </Stack>
    </Box>
  )
};

export default Items;