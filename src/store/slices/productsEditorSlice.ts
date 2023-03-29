import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {isSimpleProduct, ViewProduct} from "../../components/products-editor/types";
import {EditSimpleProduct} from "../../schemas/products-editor";


interface ProductsEditor {
  productsData: ViewProduct[]
  isLoading: boolean
  error: string
}

const initialState: ProductsEditor = {
  productsData: [],
  isLoading: false,
  error: ''
}

export interface ProductsEditorPayload {
  productsEditor: ViewProduct[]
}

interface ChangedSimpleProductPayload {
  changedSimpleProduct: EditSimpleProduct
}

export const productsEditorSlice = createSlice({
  name: 'ProductsEditor',
  initialState,
  reducers: {
    ProductsEditorFetching(state) {
      state.isLoading = true
    },
    ProductsEditorFetchingSuccess(state, action: PayloadAction<ProductsEditorPayload>) {
      state.productsData = action.payload.productsEditor
      state.isLoading = false
      state.error = ''
    },
    ProductsEditorFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    updateSimpleProduct(state, {payload: {changedSimpleProduct}}: PayloadAction<ChangedSimpleProductPayload>) {
      state.isLoading = false
      state.productsData = state.productsData.map(product => {
        if (isSimpleProduct(product))
          return product.id === changedSimpleProduct.id ? {
            ...product,
            name: changedSimpleProduct.new_name,
            price: changedSimpleProduct.new_price
          } : product
        else
          return product
      })
      state.error = ''
    },

  }
})

export default productsEditorSlice.reducer