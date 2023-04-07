import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Item, Sale} from "../../schemas/base";


interface NewSalesState {
  items: Item[]
  sales: Sale[]
  isLoading: boolean
  error: string
}

const initialState:NewSalesState = {
  items: [],
  sales: [],
  isLoading: false,
  error: ''
}

export interface NewSalesPayload {
  items: Item[]
  sales: Sale[]
}

export const newSalesSlice = createSlice({
  name: 'newSales',
  initialState,
  reducers: {
    newSalesFetching(state) {
      state.isLoading = true
    },
    newSalesFetchingSuccess(state, action: PayloadAction<NewSalesPayload>) {
      state.items = action.payload.items
      state.sales = action.payload.sales
      state.isLoading = false
      state.error = ''
    },
    newSalesFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },


  }
})

export default newSalesSlice.reducer