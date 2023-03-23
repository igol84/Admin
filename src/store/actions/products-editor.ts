import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {productsEditorSlice} from "../slices/productsEditorSlice";
import {Item} from "../../schemas/items-editor";
import {getRowsForm} from "../../components/products-editor/functions";


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

