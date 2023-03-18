import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {itemsEditorSlice} from "../slices/itemsEditorSlice";
import {Item} from "../../schemas/items-editor";
import {ItemForm} from "../../components/items-editor/types";

interface GetItemsForm {
  (items: Item[]): ItemForm[]
}

const getItemsForm: GetItemsForm = (items) => {
  return items.map(item => {
    let name = item.product.name
    if (item.product.shoes) {
      name = `${item.product.name}: ${item.product.shoes.color}, ${item.product.shoes.width}, ${item.product.shoes.size}`
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
      const itemsEditor = getItemsForm(items)
      dispatch(itemsEditorSlice.actions.ItemsEditorFetchingSuccess({itemsEditor}))
    } catch (err) {
      dispatch(itemsEditorSlice.actions.ItemsEditorFetchingError(err as Error))
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
// export const delExpense = (access_token: string, id: number) => {
//   const secureApi = secureApiCreate(access_token)
//   return async (dispatch: AppDispatch) => {
//     try {
//       dispatch(itemsEditorSlice.actions.itemsEditorFetching())
//       await secureApi.delete(`expense/${id}`)
//       dispatch(itemsEditorSlice.actions.delExpense(id))
//     } catch (err) {
//       const errors = err as Error;
//       const errorText = errors.message
//       if (errorText) {
//         dispatch(authSlice.actions.loginFail({errorText}))
//       }
//     }
//   }
// }