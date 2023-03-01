import * as yup from "yup";
import {Expense} from "../../schemas/expense";
import {toTrimTheRow} from "../../hooks/form-data";
import equal from "fast-deep-equal";
import React from "react";
import {useFetchAccess} from "../../hooks/pages";
import {updateExpense} from "../../store/actions/expenses";

export const useHandlerUpdate = () => {
  const editExpenseAccess = useFetchAccess(updateExpense)

  let expenseSchema = yup.object({
    id: yup.number().required(),
    place_id: yup.number().required(),
    desc: yup.string(),
    cost: yup.number().required(),
  })

  function computeMutation(newRow: Expense, oldRow: Expense) {
    const trimmedRow = toTrimTheRow('desc')(newRow)
    if (equal(trimmedRow, oldRow)) {
      return null
    }
    return trimmedRow
  }

  type HandlerRowUpdate = (newRow: Expense, oldRow: Expense) => Promise<Expense>
  const handlerRowUpdate: HandlerRowUpdate = React.useCallback(
    async (newRow: Expense, oldRow: Expense) => {
      const mutation = computeMutation(newRow, oldRow);
      if (mutation) {
        const validRow = await expenseSchema.validate(mutation)
        return await editExpenseAccess(validRow)
      } else {
        return oldRow
      }
    },
    [],
  )
  return handlerRowUpdate
}

