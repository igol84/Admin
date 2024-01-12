import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ItemForm} from "../../components/items-editor/types";
import {itemSale, UpdatedItem} from "../../schemas/items-editor";


interface ItemsEditor {
  itemsEditor: ItemForm[]
  itemSales: itemSale[]
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

export interface salesByItemFetchingPayload {
  itemSales: itemSale[]
}

interface ChangedItemPayload {
  changedItem: UpdatedItem
}


export const itemsEditorSlice = createSlice({
  name: 'ItemsEditor',
  initialState,
  reducers: {
    itemsEditorFetching(state) {
      state.isLoading = true
    },
    itemsEditorFetchingSuccess(state, action: PayloadAction<ItemsEditorPayload>) {
      state.itemsEditor = action.payload.itemsEditor
      state.isLoading = false
      state.error = ''
    },
    itemsEditorFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    salesByItemFetching(state) {
      state.isLoading = true
    },
    salesByItemFetchingSuccess(state, action: PayloadAction<salesByItemFetchingPayload>) {
      state.itemSales = action.payload.itemSales
      state.isLoading = false
      state.error = ''
    },
    salesByItemFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    updateItem(state, {payload: {changedItem}}: PayloadAction<ChangedItemPayload>) {
      state.isLoading = false
      state.itemsEditor = state.itemsEditor.map(item => {
        return item.id == changedItem.id ? {...item, qty: changedItem.new_qty, buy_price: changedItem.new_price} : item
      })
      state.error = ''
    },
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