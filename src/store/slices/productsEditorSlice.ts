import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {isShoes, isSimpleProduct, ViewProduct} from "../../components/products-editor/types";
import {EditColor, EditShoes, EditSimpleProduct, EditSize} from "../../schemas/products-editor";
import produce from "immer";


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

interface ChangedColorPayload {
  changedColor: EditColor
}

interface ChangedSizePayload {
  changedSize: EditSize
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
      state.productsData = produce(state.productsData, draftData => {
        draftData.map(product => {
          if (isSimpleProduct(product) && product.id === changedSimpleProduct.id) {
            product.name = changedSimpleProduct.new_name
            product.price = changedSimpleProduct.new_price
          }
        })
      })

      state.error = ''
    },
    updateShoes(state, {payload: {changedShoes}}: PayloadAction<ChangedShoesPayload>) {
      state.isLoading = false
      state.productsData = produce(state.productsData, draftData => {
        draftData.map(product => {
          if (isShoes(product) && product.name === changedShoes.name) {
            product.name = changedShoes.new_name
            product.colors.map(color => {
              color.widths.map(width => {
                width.sizes.map(size => {
                  if (changedShoes.price_for_sale !== null) {
                    size.price = changedShoes.price_for_sale
                  }
                })
              })
            })
          }
        })
      })
      state.error = ''
    },
    updateColor(state, {payload: {changedColor}}: PayloadAction<ChangedColorPayload>) {
      state.isLoading = false
      state.productsData = produce(state.productsData, draftData => {
        draftData.map(product => {
          if (isShoes(product) && product.name === changedColor.name) {
            product.colors.map(color => {
              if (color.color === changedColor.color) {
                color.widths.map(width => {
                  color.color = changedColor.new_color
                  width.sizes.map(size => {
                    if (changedColor.price_for_sale !== null) {
                      size.price = changedColor.price_for_sale
                    }
                  })
                })
              }
            })
          }
        })
      })
      state.error = ''
    },
    updateSize(state, {payload: {changedSize}}: PayloadAction<ChangedSizePayload>) {
      state.isLoading = false
      state.productsData = produce(state.productsData, draftData => {
        draftData.map(product => {
          if (isShoes(product)) {
            product.colors.map(color => {
              color.widths.map(width => {
                width.sizes.map(size => {
                  if (size.prod_id === changedSize.id) {
                    size.size = changedSize.size
                    size.length = changedSize.length
                    size.price = changedSize.price_for_sale
                  }
                })
              })
            })
          }
        })
      })
      state.error = ''
    }
  }
})

export default productsEditorSlice.reducer