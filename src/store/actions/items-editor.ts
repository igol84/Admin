import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {itemsEditorSlice} from "../slices/itemsEditorSlice";
import {Item, Sale} from "../../schemas/items-editor";
import {ItemForm} from "../../components/items-editor/types";
import {authSlice} from "../slices/authSlice";

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
      const items: Item[] = await secureApi.get(`item/by_store_id/${storeId}`).json()
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
      const itemSales: Sale[] = await secureApi.get(`handler_items_editor/get_item_sales/${itemId}`).json()
      dispatch(itemsEditorSlice.actions.SalesByItemFetchingSuccess({itemSales}))
    } catch (err) {
      dispatch(itemsEditorSlice.actions.SalesByItemFetchingError(err as Error))
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
// export const addNewExpense = (access_token: string, expense: CreateExpense) => {
//   const secureApi = secureApiCreate(access_token)
//   return async (dispatch: AppDispatch) => {
//     try {
//       dispatch(itemsEditorSlice.actions.itemsEditorFetching())
//       const newExpense: Expense = await secureApi.post('expense', {json: expense}).json()
//       dispatch(itemsEditorSlice.actions.addNewExpense({newExpense}))
//       return newExpense
//     } catch (err) {
//       const errors = err as Error;
//       const errorText = errors.message
//       if (errorText) {
//         dispatch(authSlice.actions.loginFail({errorText}))
//       }
//     }
//   }
// }
//
// export const updateExpense = (access_token: string, expense: UpdateExpense) => {
//   const updated = {...expense, date_cost: formatISODate(expense.date_cost)}
//   const secureApi = secureApiCreate(access_token)
//   return async (dispatch: AppDispatch) => {
//     try {
//       dispatch(itemsEditorSlice.actions.itemsEditorFetching())
//       const updatedExpense: Expense  = await secureApi.put('expense', {json: updated}).json()
//       dispatch(itemsEditorSlice.actions.updateExpense({changedExpense: updatedExpense}))
//       return updatedExpense
//     } catch (err) {
//       const errors = err as Error;
//       const errorText = errors.message
//       if (errorText) {
//         dispatch(authSlice.actions.loginFail({errorText}))
//       }
//     }
//   }
// }
//
