import {ExpensesCategoryVo} from "./ExpensesCategory.model";

export class ExpensesVo {

    public id: number;
    public title: string;
    public amount: number;
    public dateExpense: Date;
    public dateExpenseMin: string;
    public dateExpenseMax: string;
    public expensesCategoryVo:ExpensesCategoryVo;
}