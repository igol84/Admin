import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {newSalesSlice} from "../slices/newSalesSlice";
import {Item} from "../../schemas/base";




export const fetchDataForNewSale = (access_token: string, {storeId}: any = null) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(newSalesSlice.actions.newSalesFetching())
      const items: Item[] = await secureApi.get(`item/by_store_id/${storeId}`).json()
      dispatch(newSalesSlice.actions.newSalesFetchingSuccess({items}))
    } catch (err) {
      dispatch(newSalesSlice.actions.newSalesFetchingError(err as Error))
    }
  }
}

