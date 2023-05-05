import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Expense, Place, Sale} from "../../schemas/base";
import {Interval, PlaceView, Report} from "../../schemas/report";
import {getPlacesView, getReportView} from "./reportUtility";


interface SellerState {
  sales: Sale[]
  report: Report[]
  placesView: PlaceView[]
  expenses: Expense[]
  isLoading: boolean
  error: string
}

const initialState: SellerState = {
  sales: [],
  report: [],
  placesView: [],
  expenses: [],
  isLoading: false,
  error: ''
}

export interface SalesPayload {
  sales: Sale[]
  places: Place[]
  expenses: Expense[]
}

export interface GetReport {
  interval: Interval
  filterPlaceId: number
}

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    reportFetching(state) {
      state.isLoading = true
    },
    reportFetchingSuccess(state, {payload: {sales, places, expenses}}: PayloadAction<SalesPayload>) {
      state.sales = sales
      state.expenses = expenses
      state.placesView = getPlacesView(places)
      state.isLoading = false
      state.error = ''
    },
    reportFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    getReport(state, {payload: {filterPlaceId, interval}}: PayloadAction<GetReport>) {
      state.report = getReportView(state.sales, state.expenses, interval, filterPlaceId)
      state.isLoading = false
      state.error = ''
    },
  }
})

export default reportSlice.reducer