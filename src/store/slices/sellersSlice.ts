import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SellerResponse} from "../actions/sellers";

interface SellerState {
  sellers: SellerResponse[]
  count: number
  loading: boolean
  error: string
}

const initialState: SellerState = {
  sellers: [],
  count: 0,
  loading: false,
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
      state.loading = true
    },
    sellersFetchingSuccess(state, action: PayloadAction<SellersPayload>) {
      state.sellers = action.payload.sellers
      state.count = 1
      state.loading = false
      state.error = ''
    },
    sellersFetchingError(state, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    },

  }
})

export default sellersSlice.reducer