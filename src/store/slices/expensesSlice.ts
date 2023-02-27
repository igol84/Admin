import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Expense} from "../../achemas/expense";

interface ExpenseState {
  expenses: Expense[]
  isLoading: boolean
  error: string
}

const initialState: ExpenseState = {
  expenses: [],
  isLoading: false,
  error: ''
}

export interface ExpensesPayload {
  expenses: Expense[]
}

interface ExpensePayload {
  newExpense: Expense
}

interface ChangedExpensePayload {
  changedExpense: Expense
}

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    expensesFetching(state) {
      state.isLoading = true
    },
    expensesFetchingSuccess(state, action: PayloadAction<ExpensesPayload>) {
      state.expenses = action.payload.expenses
      state.isLoading = false
      state.error = ''
    },
    expensesFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    addNewExpense(state, {payload: {newExpense}}: PayloadAction<ExpensePayload>) {
      state.isLoading = false
      state.expenses.unshift(newExpense)
      state.error = ''
    },
    updateExpense(state, {payload: {changedExpense}}: PayloadAction<ChangedExpensePayload>) {
      state.isLoading = false
      state.expenses = state.expenses.map(expense => {
        return expense.id == changedExpense.id ? changedExpense : expense
      })
      state.error = ''
    },
    delExpense(state, {payload: delId}: PayloadAction<number>) {
      state.isLoading = false
      state.expenses = state.expenses.filter(expense => {
        return expense.id !== delId
      })
      state.error = ''
    }

  }
})

export default expensesSlice.reducer