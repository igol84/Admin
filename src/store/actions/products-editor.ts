import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {productsEditorSlice} from "../slices/productsEditorSlice";
import {Item} from "../../schemas/items-editor";
import {getRowsForm} from "../../components/products-editor/functions";
import {authSlice} from "../slices/authSlice";
import {EditSimpleProduct} from "../../schemas/products-editor";


export const fetchProductsEditor = (access_token: string, {storeId}: any = null) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(productsEditorSlice.actions.ProductsEditorFetching())
      const items: Item[] = await secureApi.get(`item/by_store_id/${storeId}`).json()
      const productsEditor = getRowsForm(items)
      dispatch(productsEditorSlice.actions.ProductsEditorFetchingSuccess({productsEditor}))
    } catch (err) {
      dispatch(productsEditorSlice.actions.ProductsEditorFetchingError(err as Error))
    }
  }
}

export const updateSimpleProduct = (access_token: string, productData: EditSimpleProduct) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      const url = 'handler_product_price_editor/edit_product'
      const updatedSimpleProduct: EditSimpleProduct = await secureApi.put(url, {json: productData}).json()
      dispatch(productsEditorSlice.actions.updateSimpleProduct({changedSimpleProduct: updatedSimpleProduct}))
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

