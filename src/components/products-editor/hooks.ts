import {useStyle} from "./style";
import {useAppSelector, useStoreId} from "../../hooks/redux";
import {useIsLoadingDisplay, useLoaderAccess} from "../../hooks/pages";
import {fetchProductsEditor} from "../../store/actions/products-editor";
import React, {useState} from "react";
import {ViewProduct} from "./types";

interface UseProductEditor {
  (rowsOnPage: number): [
    style: any,
    filteredProductsDataOfPage: ViewProduct[],
    isSelected: (rowIdx: number) => boolean,
    onSelect: (rowIdx: number) => () => void,
    resetFormData: () => void,
    search: string,
    onSearch: (value: string) => void,
    countOfPages: number,
    page: number,
    onChangePage: (event: React.ChangeEvent<unknown>, page: number) => void,
    emptyRows: number,
    showLoading: boolean,
    isLoading: boolean
  ]
}

export const useProductEditor: UseProductEditor = (rowsOnPage) => {
  const style = useStyle()
  const storeId = useStoreId()
  useLoaderAccess(fetchProductsEditor, {storeId})
  const {productsData, isLoading} = useAppSelector(state => state.productsEditorSlice)
  const showLoading = useIsLoadingDisplay(isLoading)

  const [search, setSearch] = useState<string>('')
  const searchRowsByName = (row: ViewProduct) => row.name.toUpperCase().includes(search.toUpperCase())
  const onSearch = (value: string) => {
    setSearch(value)
    setSelectedPage(1)
  }

  const searchedProductsData = productsData.slice().filter(searchRowsByName)
  const countOfRows = searchedProductsData.length
  const countOfPages = Math.ceil(countOfRows / rowsOnPage)

  const [selectedPage, setSelectedPage] = useState(1)
  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setSelectedPage(page)
  }
  const emptyRows = selectedPage > 0 ? Math.max(0, (selectedPage) * rowsOnPage - countOfRows) : 0
  const startSlice = (selectedPage - 1) * rowsOnPage
  const endSlice = selectedPage * rowsOnPage
  const filteredProductsDataOfPage = searchedProductsData.slice(startSlice, endSlice)

  const [selectedRowId, setSelectedRowId] = useState<number | null>(null)
  const onSelect = (rowIdx: number) => () => {
    setSelectedRowId(rowIdx)
  }
  const isSelected = (rowIdx: number) => rowIdx === selectedRowId
  const resetFormData = () => {
    setSelectedRowId(null)
  }
  return [
    style, filteredProductsDataOfPage, isSelected, onSelect, resetFormData, search, onSearch, countOfPages, selectedPage,
    onChangePage, emptyRows, showLoading, isLoading
  ]
}