import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SellerResponse} from "../actions/sellers";

interface SellerState {
  sellers: SellerResponse[]
  count: number
  isLoading: boolean
  error: string
}

const initialState: SellerState = {
  sellers: [],
  count: 0,
  isLoading: false,
  error: ''
}

interface SellersPayload {
  sellers: SellerResponse[]
}

export const sellersSlice = createSlice({
  name: 'sellers',
  initialState,
  reducers: {
    sellersFetching(state) {
      state.isLoading = true
    },
    sellersFetchingSuccess(state, action: PayloadAction<SellersPayload>) {
      state.sellers = action.payload.sellers
      state.count = 1
      state.isLoading = false
      state.error = ''
    },
    sellersFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },

  }
})

export default sellersSlice.reducer