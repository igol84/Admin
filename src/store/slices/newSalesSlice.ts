import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Item, Sale} from "../../schemas/base";
import produce from "immer";
import {PutOnSale} from "../../schemas/new-sale";


interface NewSalesState {
  items: Item[]
  sales: Sale[]
  isLoading: boolean
  error: string
}

const initialState: NewSalesState = {
  items: [],
  sales: [],
  isLoading: false,
  error: ''
}

export interface NewSalesPayload {
  items: Item[]
  sales: Sale[]
}

export interface PutOnSalePayload {
  putOnSale: PutOnSale

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
    putOnSale(state, {payload: {putOnSale}}: PayloadAction<PutOnSalePayload>) {
      state.items = produce(state.items, draftData => {
        let qtyNeedToAdd = putOnSale.qty
        draftData.map(item => {
          if (item.prod_id === putOnSale.productId) {
            if (qtyNeedToAdd > 0) {
              const sliQty = qtyNeedToAdd > item.qty ? item.qty : qtyNeedToAdd
              item.qty -= sliQty
              qtyNeedToAdd -= sliQty
            }
          }
        })
      })
    },


  }
})

export default newSalesSlice.reducer