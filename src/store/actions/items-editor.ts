import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {itemsEditorSlice} from "../slices/itemsEditorSlice";
import {itemSale, UpdatedItem} from "../../schemas/items-editor";
import {ItemForm} from "../../components/items-editor/types";
import {authSlice} from "../slices/authSlice";
import {Item} from "../../schemas/base";

interface GetRowsForm {
  (items: Item[]): ItemForm[]
}

const getRowsForm: GetRowsForm = (items) => {
  return items.map(item => {
    let name = item.product.name
    if (item.product.shoes) {
      const shoesProps = []
      const shoesName = item.product.name
      shoesProps.push(shoesName)
      const width = item.product.shoes.width ? item.product.shoes.width : 'Medium'
      if (width !== 'Medium')
        shoesProps.push(width)
      const size = item.product.shoes.size
      shoesProps.push(size)
      name = shoesProps.join(' - ')
    }
    return {
      id: item.id,
      name,
      qty: item.qty,
      buy_price: item.buy_price,
      date_buy: item.date_buy.toString()
    }
  })
}
export const fetchItemsEditor = (access_token: string, {storeId}: any = null) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(itemsEditorSlice.actions.ItemsEditorFetching())
      const items: Item[] = await secureApi.get(`item?store_id=${storeId}`).json()
      const itemsEditor = getRowsForm(items)
      dispatch(itemsEditorSlice.actions.ItemsEditorFetchingSuccess({itemsEditor}))
    } catch (err) {
      dispatch(itemsEditorSlice.actions.ItemsEditorFetchingError(err as Error))
    }
  }
}

interface FetchSalesByItemProps {
  itemId: number
}

export const fetchSalesByItem = (access_token: string, {itemId}: FetchSalesByItemProps) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(itemsEditorSlice.actions.SalesByItemFetching())
      const itemSales: itemSale[] = await secureApi.get(`handler_items_editor/get_item_sales/${itemId}`).json()
      dispatch(itemsEditorSlice.actions.SalesByItemFetchingSuccess({itemSales}))
    } catch (err) {
      dispatch(itemsEditorSlice.actions.SalesByItemFetchingError(err as Error))
    }
  }
}

export const updateItem = (access_token: string, itemData: UpdatedItem) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(itemsEditorSlice.actions.SalesByItemFetching())
      const updatedItem: UpdatedItem = await secureApi.put('handler_items_editor/edit_item', {json: itemData}).json()
      dispatch(itemsEditorSlice.actions.updateItem({changedItem: updatedItem}))
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

export const delItem = (access_token: string, itemId: number) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(itemsEditorSlice.actions.SalesByItemFetching())
      await secureApi.delete(`handler_items_editor/del_item/${itemId}`)
      dispatch(itemsEditorSlice.actions.delItem(itemId))
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}
