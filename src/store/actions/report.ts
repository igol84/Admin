import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {reportSlice} from "../slices/reportSlice";
import {Expense, Place, Sale} from "../../schemas/base";

export const fetchReport = (access_token: string, {storeId}: any = null) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(reportSlice.actions.reportFetching())
      const sales: Sale[] = await secureApi.get(`sale/?store_id=${storeId}`).json()
      const places: Place[] = await secureApi.get(`place/?store_id=${storeId}`).json()
      const expenses: Expense[] = await secureApi.get(`expense?store_id=${storeId}`).json()
      dispatch(reportSlice.actions.reportFetchingSuccess({sales, places, expenses}))
    } catch (err) {
      dispatch(reportSlice.actions.reportFetchingError(err as Error))
    }
  }
}
