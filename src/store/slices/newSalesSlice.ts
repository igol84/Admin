import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Item} from "../../schemas/base";




interface NewSalesState {
  items: Item[]
  isLoading: boolean
  error: string
}

const initialState:NewSalesState = {
  items: [],
  isLoading: false,
  error: ''
}

export interface NewSalesPayload {
  items: Item[]
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