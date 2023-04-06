import {Expense} from "./base";

export type CreateExpense = Omit<Expense, 'id'>

export interface UpdateExpense extends Expense{
}