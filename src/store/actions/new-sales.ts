import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {newSalesSlice} from "../slices/newSalesSlice";
import {Item, Sale} from "../../schemas/base";
import {PutOnSale, RemovedNewSaleItem, UpdatedNewSaleItem} from "../../schemas/new-sale";


export const fetchDataForNewSale = (access_token: string, {storeId}: any = null) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(newSalesSlice.actions.newSalesFetching())
      const items: Item[] = await secureApi.get(`item?store_id=${storeId}`).json()
      const sales: Sale[] = await secureApi.get(`sale?store_id=${storeId}`).json()
      dispatch(newSalesSlice.actions.newSalesFetchingSuccess({items, sales}))
    } catch (err) {
      dispatch(newSalesSlice.actions.newSalesFetchingError(err as Error))
    }
  }
}

export const putOnSale = (putOnSale: PutOnSale) => {
  return (dispatch: AppDispatch) => {
    dispatch(newSalesSlice.actions.putOnSale({putOnSale}))
  }
}

export const updateNewSaleItem = (updatedNewSaleItem: UpdatedNewSaleItem) => {
  return (dispatch: AppDispatch) => {
    dispatch(newSalesSlice.actions.updateNewSaleItem({updatedNewSaleItem}))
  }
}

export const removeNewSaleItem = (removedNewSaleItem: RemovedNewSaleItem) => {
  return (dispatch: AppDispatch) => {
    dispatch(newSalesSlice.actions.removeNewSaleItem({removedNewSaleItem}))
  }
}