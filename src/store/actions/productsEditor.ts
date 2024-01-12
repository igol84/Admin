import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {productsEditorSlice} from "../slices/productsEditorSlice";
import {getRowsForm} from "../../components/products-editor/utility";
import {authSlice} from "../slices/authSlice";
import {EditColor, EditShoes, EditSimpleProduct, EditSize} from "../../schemas/products-editor";
import {Item} from "../../schemas/base";


export const fetchProductsEditor = (access_token: string, {storeId}: any = null) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(productsEditorSlice.actions.productsEditorFetching())
      const items: Item[] = await secureApi.get(`item/by_store_id/${storeId}`).json()
      const productsEditor = getRowsForm(items)
      dispatch(productsEditorSlice.actions.productsEditorFetchingSuccess({productsEditor}))
    } catch (err) {
      dispatch(productsEditorSlice.actions.productsEditorFetchingError(err as Error))
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


export const updateShoes = (access_token: string, shoesData: EditShoes) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      const url = 'handler_product_price_editor/edit_shoes'
      const updatedShoes: EditShoes = await secureApi.put(url, {json: shoesData}).json()
      dispatch(productsEditorSlice.actions.updateShoes({changedShoes: updatedShoes}))
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

export const updateColor = (access_token: string, colorData: EditColor) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      const url = 'handler_product_price_editor/edit_color'
      const updatedColor: EditColor = await secureApi.put(url, {json: colorData}).json()
      dispatch(productsEditorSlice.actions.updateColor({changedColor: updatedColor}))
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

export const updateSize = (access_token: string, sizeData: EditSize) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      const url = 'handler_product_price_editor/edit_size'
      const updatedSize: EditSize = await secureApi.put(url, {json: sizeData}).json()
      dispatch(productsEditorSlice.actions.updateSize({changedSize: updatedSize}))
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}