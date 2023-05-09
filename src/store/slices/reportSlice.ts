import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Expense, Place, Sale} from "../../schemas/base";
import {PlaceView, ReportData} from "../../schemas/reportData";
import {getPlacesView} from "../../components/Report/utility";


interface SellerState {
  sales: Sale[]
  report: ReportData[]
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
  }
})

export default reportSlice.reducer