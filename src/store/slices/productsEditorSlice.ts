import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {isShoes, isSimpleProduct, ViewProduct} from "../../components/products-editor/types";
import {EditShoes, EditSimpleProduct} from "../../schemas/products-editor";


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

interface ChangedShoesPayload {
  changedShoes: EditShoes
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
    updateShoes(state, {payload: {changedShoes}}: PayloadAction<ChangedShoesPayload>) {
      state.isLoading = false
      state.productsData = state.productsData.map(product => {
        if (isShoes(product)) {
          const newColors = product.colors.map(color => {
            const widths = color.widths.map(width => {
              const sizes = width.sizes.map(size => {
                if (changedShoes.price_for_sale !== null) {
                  return {...size, price: changedShoes.price_for_sale}
                } else {
                  return size
                }
              })
              return {...width, sizes}
            })
            return {...color, widths}
          })
          return product.name === changedShoes.name ? {
            ...product,
            name: changedShoes.new_name,
            colors: newColors
          } : product
        } else
          return product
      })
      state.error = ''
    },
  }
})

export default productsEditorSlice.reducer