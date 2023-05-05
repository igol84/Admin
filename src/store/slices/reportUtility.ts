import {Expense, Place, Sale} from "../../schemas/base";
import {Interval, PlaceView, Report} from "../../schemas/report";
import _ from "lodash";

export const getPlacesView = (places: Place[]): PlaceView[] => {
  return places.map(place => {
    return {id: place.id, name: place.name}
  })
}

export interface GetReportView {
  (
    sales: Sale[],
    expenses: Expense[],
    interval: Interval,
    filterPlaceId: number,
  )
    : Report[]
}


export const getReportView: GetReportView = (sales, expenses, interval, filterPlaceId) => {
  const filteredByPlace = filterPlaceId >= 0 ?
    sales.filter(sale => sale.place_id === filterPlaceId)
    : sales
  const withSliceDate = filteredByPlace.map(sale => {
    return {...sale, date_time: interval === 'month' ? sale.date_time.slice(0, 7) : sale.date_time.slice(0, 4)}
  })
  const countData = withSliceDate.map(sale => {
    const proceeds = sale.sale_line_items.reduce((proceed, sli) => proceed + sli.qty * sli.sale_price, 0)
    const costs = sale.sale_line_items.reduce((cost, sli) => cost + sli.qty * sli.item.buy_price, 0)
    return {proceeds, costs, date: sale.date_time}
  })

  const groupData = new Map()
  countData.forEach(row => {
    if (!groupData.has(row.date)) {
      groupData.set(row.date, {proceeds: row.proceeds, costs: row.costs})
    } else {
      const prevProceeds = groupData.get(row.date).proceeds
      const prevCosts = groupData.get(row.date).costs
      groupData.set(row.date, {proceeds: prevProceeds + row.proceeds, costs: prevCosts + row.costs})
    }
  })

  const expensesFilteredByPlace = filterPlaceId >= 0 ?
    expenses.filter(expense => expense.place_id === filterPlaceId)
    : expenses

  const expensesWithSliceDate = expensesFilteredByPlace.map(expense => {
    return {
      date: interval === 'month' ? expense.date_cost.slice(0, 7) : expense.date_cost.slice(0, 4),
      cost: expense.cost
    }
  })

  const expensesGroupData = new Map()
  expensesWithSliceDate.forEach(row => {
    if (!expensesGroupData.has(row.date)) {
      expensesGroupData.set(row.date, {cost: row.cost})
    } else {
      const prevCosts = expensesGroupData.get(row.date).cost
      expensesGroupData.set(row.date, {cost: prevCosts + row.cost})
    }
  })


  const result: Report[] = []
  groupData.forEach((value, key) => {
    const expenses = expensesGroupData.has(key) ? expensesGroupData.get(key).cost : 0
    result.push({data: key, proceeds: value.proceeds, costs: value.costs + expenses})
  })


  return _.orderBy(result, 'data', 'desc')
}


