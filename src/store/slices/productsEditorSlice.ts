import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {isShoes, isSimpleProduct, ViewProduct} from "../../components/products-editor/types";
import {EditColor, EditShoes, EditSimpleProduct, EditSize} from "../../schemas/products-editor";


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
          return product.name === changedShoes.name ? {
            ...product,
            name: changedShoes.new_name,
            colors: product.colors.map(color => {
              const widths = color.widths.map(width => {
                const sizes = width.sizes.map(
                  size => changedShoes.price_for_sale !== null ? {...size, price: changedShoes.price_for_sale} : size
                )
                return {...width, sizes}
              })
              return {...color, widths}
            })
          } : product
        } else return product
      })
      state.error = ''
    },
    updateColor(state, {payload: {changedColor}}: PayloadAction<ChangedColorPayload>) {
      state.isLoading = false
      state.productsData = state.productsData.map(product => {
        if (isShoes(product)) {
          return product.name === changedColor.name ? {
            ...product,
            colors: product.colors.map(color => {
              if (color.color === changedColor.color) {
                const widths = color.widths.map(width => {
                  const sizes = width.sizes.map(size => {
                    if (changedColor.price_for_sale !== null) {
                      return {...size, price: changedColor.price_for_sale}
                    } else return size
                  })
                  return {...width, sizes}
                })
                return {...color, widths, color: changedColor.new_color}
              } else return color
            })
          } : product
        } else return product
      })
      state.error = ''
    },
    updateSize(state, {payload: {changedSize}}: PayloadAction<ChangedSizePayload>) {
      state.isLoading = false
      state.productsData = state.productsData.map(product => {
        if (isShoes(product)) {
          const colors = product.colors.map(color => {
            const widths = color.widths.map(width => {
              const sizes = width.sizes.map(size => {
                return size.prod_id === changedSize.id
                  ? {...size, size: changedSize.size, length: changedSize.length, price: changedSize.price_for_sale}
                  : size
              })
              return {...width, sizes}
            })
            return {...color, widths}
          })
          return {...product, colors}
        } else return product
      })
      state.error = ''
    },
  }
})

export default productsEditorSlice.reducer