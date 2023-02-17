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

export interface SellersPayload {
  sellers: SellerResponse[]
}

interface SellerPayload {
  newSeller: SellerResponse
}

interface ChangedSellerPayload {
  changedSeller: SellerResponse
}

export const sellersSlice = createSlice({
  name: 'sellers',
  initialState,
  reducers: {
    sellersFetching(state) {
      state.isLoading = true
    },
    sellersFetchingSuccess(state, action: PayloadAction<SellersPayload>) {
      state.sellers = action.payload.sellers.reverse()
      state.count = 1
      state.isLoading = false
      state.error = ''
    },
    sellersFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    addNewSeller(state, {payload: {newSeller}}: PayloadAction<SellerPayload>) {
      state.isLoading = false
      state.sellers.unshift(newSeller)
      state.error = ''
    },
    updateSeller(state, {payload: {changedSeller}}: PayloadAction<ChangedSellerPayload>) {
      state.isLoading = false
      state.sellers = state.sellers.map(seller => {
        return seller.id == changedSeller.id ? changedSeller : seller
      })
      state.error = ''
    }

  }
})

export default sellersSlice.reducer