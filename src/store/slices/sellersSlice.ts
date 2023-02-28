import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SellerWithDetails} from "../../schemas/seller";


interface SellerState {
  sellers: SellerWithDetails[]
  isLoading: boolean
  error: string
}

const initialState: SellerState = {
  sellers: [],
  isLoading: false,
  error: ''
}

export interface SellersPayload {
  sellers: SellerWithDetails[]
}

interface SellerPayload {
  newSeller: SellerWithDetails
}

interface ChangedSellerPayload {
  changedSeller: SellerWithDetails
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
    },
    delSeller(state, {payload: delId}: PayloadAction<number>) {
      state.isLoading = false
      state.sellers = state.sellers.filter(seller => {
        return seller.id !== delId
      })
      state.error = ''
    }

  }
})

export default sellersSlice.reducer