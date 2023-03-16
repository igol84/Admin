import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NewProducts} from "../../schemas/new-products";


interface NewProductState {
  products: NewProducts[]
  isLoading: boolean
  error: string
}

const initialState: NewProductState = {
  products: [],
  isLoading: false,
  error: ''
}

export interface ProductsPayload {
  products: NewProducts[]
}

export interface NewProductPayload {
  products: NewProducts[]
}

export const newProductsSlice = createSlice({
  name: 'NewProducts',
  initialState,
  reducers: {
    RequestProducts(state) {
      state.isLoading = true
    },
    RequestProductsSuccess(state, action: PayloadAction<ProductsPayload>) {
      state.products = action.payload.products
      state.isLoading = false
      state.error = ''
    },
    RequestProductsError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    NewProductsFetching(state) {
      state.isLoading = true
    },
    NewProductsFetchingSuccess(state, action: PayloadAction<NewProductPayload>) {
      const newProducts: NewProducts[] = action.payload.products
      state.products.unshift(...newProducts)
      state.isLoading = false
      state.error = ''
    },
    NewProductsFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    addNewNewProduct(state) {
      state.isLoading = false
      state.error = ''
    },
  }
})

export default newProductsSlice.reducer