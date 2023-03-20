import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ItemForm} from "../../components/items-editor/types";
import {Sale} from "../../schemas/items-editor";


interface ItemsEditor {
  itemsEditor: ItemForm[]
  itemSales: Sale[]
  isLoading: boolean
  error: string
}

const initialState: ItemsEditor = {
  itemsEditor: [],
  itemSales: [],
  isLoading: false,
  error: ''
}

export interface ItemsEditorPayload {
  itemsEditor: ItemForm[]
}

export interface SalesByItemFetchingPayload {
  itemSales: Sale[]
}

// interface ExpensePayload {
//   newExpense: Expense
// }
//
// interface ChangedExpensePayload {
//   changedExpense: Expense
// }

export const itemsEditorSlice = createSlice({
  name: 'ItemsEditor',
  initialState,
  reducers: {
    ItemsEditorFetching(state) {
      state.isLoading = true
    },
    ItemsEditorFetchingSuccess(state, action: PayloadAction<ItemsEditorPayload>) {
      state.itemsEditor = action.payload.itemsEditor
      state.isLoading = false
      state.error = ''
    },
    ItemsEditorFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    SalesByItemFetching(state) {
      state.isLoading = true
    },
    SalesByItemFetchingSuccess(state, action: PayloadAction<SalesByItemFetchingPayload>) {
      state.itemSales = action.payload.itemSales
      state.isLoading = false
      state.error = ''
    },
    SalesByItemFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    // updateExpense(state, {payload: {changedExpense}}: PayloadAction<ChangedExpensePayload>) {
    //   state.isLoading = false
    //   state.ItemsEditor = state.ItemsEditor.map(expense => {
    //     return expense.id == changedExpense.id ? changedExpense : expense
    //   })
    //   state.error = ''
    // },
    delItem(state, {payload: delId}: PayloadAction<number>) {
      state.isLoading = false
      state.itemsEditor = state.itemsEditor.filter(item => {
        return item.id !== delId
      })
      state.error = ''
    }

  }
})

export default itemsEditorSlice.reducer