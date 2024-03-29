import {AppDispatch} from "../index";
import {secureApiCreate} from "../../ky";
import {expensesSlice} from "../slices/expensesSlice";
import {authSlice} from "../slices/authSlice";
import {CreateExpense, UpdateExpense} from "../../schemas/expense";
import {formatISODate} from "../../hooks/form-data";
import {Expense, Place} from "../../schemas/base";



export const fetchExpenses = (access_token: string, {storeId}: any = null) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(expensesSlice.actions.expensesFetching())
      const expenses: Expense[] = await secureApi.get(`expense?store_id=${storeId}`).json()
      const places: Place[] = await secureApi.get(`place?store_id=${storeId}`).json()
      dispatch(expensesSlice.actions.expensesFetchingSuccess({expenses, places}))
    } catch (err) {
      dispatch(expensesSlice.actions.expensesFetchingError(err as Error))
    }
  }
}

export const addNewExpense = (access_token: string, expense: CreateExpense) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(expensesSlice.actions.expensesFetching())
      const newExpense: Expense = await secureApi.post('expense', {json: expense}).json()
      dispatch(expensesSlice.actions.addNewExpense({newExpense}))
      return newExpense
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

export const updateExpense = (access_token: string, expense: UpdateExpense) => {
  const updated = {...expense, date_cost: formatISODate(new Date(expense.date_cost))}
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(expensesSlice.actions.expensesFetching())
      const updatedExpense: Expense  = await secureApi.put('expense', {json: updated}).json()
      dispatch(expensesSlice.actions.updateExpense({changedExpense: updatedExpense}))
      return updatedExpense
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}

export const delExpense = (access_token: string, id: number) => {
  const secureApi = secureApiCreate(access_token)
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(expensesSlice.actions.expensesFetching())
      await secureApi.delete(`expense/${id}`)
      dispatch(expensesSlice.actions.delExpense(id))
    } catch (err) {
      const errors = err as Error;
      const errorText = errors.message
      if (errorText) {
        dispatch(authSlice.actions.loginFail({errorText}))
      }
    }
  }
}