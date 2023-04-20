import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Item, Place, Sale, Seller} from "../../schemas/base";
import produce from "immer";
import {
  EditSLIPrice,
  NewSaleLineItem,
  OutputEndSale,
  PutOnSale,
  RemovedNewSaleItem,
  UpdatedNewSaleItem
} from "../../schemas/new-sale";


interface NewSalesState {
  items: Item[]
  newSaleLineItems: NewSaleLineItem[]
  sales: Sale[]
  sellers: Seller[]
  places: Place[]
  isLoading: boolean
  error: string
}

const initialState: NewSalesState = {
  items: [],
  newSaleLineItems: [],
  sales: [],
  sellers: [],
  places: [],
  isLoading: false,
  error: ''
}

export interface NewSalesPayload {
  items: Item[]
  sellers: Seller[]
  places: Place[]
}

export interface SalesPayload {
  sales: Sale[]
}

export interface PutOnSalePayload {
  putOnSale: PutOnSale
}

export interface UpdateNewSaleItemPayload {
  updatedNewSaleItem: UpdatedNewSaleItem
}

export interface RemoveNewSaleItemPayload {
  removedNewSaleItem: RemovedNewSaleItem
}

export interface SaveNewSalePayload {
  outputEndSale: OutputEndSale
}

export interface EditSLIPricePayload {
  editPriceData: EditSLIPrice
}


export const newSalesSlice = createSlice({
  name: 'newSales',
  initialState,
  reducers: {
    newSalesFetching(state) {
      state.isLoading = true
    },
    newSalesFetchingSuccess(state, action: PayloadAction<NewSalesPayload>) {
      state.items = action.payload.items
      state.sellers = action.payload.sellers
      state.places = action.payload.places
      state.newSaleLineItems = []
      state.isLoading = false
      state.error = ''
    },
    fetchSalesSuccess(state, action: PayloadAction<SalesPayload>) {
      state.sales = action.payload.sales
      state.isLoading = false
      state.error = ''
    },
    newSalesFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.error = action.payload.message
    },
    putOnSale(state, {payload: {putOnSale}}: PayloadAction<PutOnSalePayload>) {
      state.items = produce(state.items, draftData => {
        let qtyNeedToAdd = putOnSale.qty
        draftData.map(item => {
          if (item.prod_id === putOnSale.productId) {
            if (qtyNeedToAdd > 0) {
              const sliQty = qtyNeedToAdd > item.qty ? item.qty : qtyNeedToAdd
              item.qty -= sliQty

              let added = false
              state.newSaleLineItems = produce(state.newSaleLineItems, draftData => {
                draftData.map(sli => {
                  if (sli.itemId === item.id && sli.salePrice === putOnSale.salePrice) {
                    sli.qty += sliQty
                    added = true
                  }
                })
              })
              if (!added && sliQty > 0) {
                const newSaleLineItem: NewSaleLineItem = {
                  itemId: item.id, qty: sliQty, salePrice: putOnSale.salePrice
                }
                state.newSaleLineItems.push(newSaleLineItem)
              }
              qtyNeedToAdd -= sliQty
            }
          }
        })
      })
    },
    updateNewSaleItem(state, {payload: {updatedNewSaleItem}}: PayloadAction<UpdateNewSaleItemPayload>) {
      state.newSaleLineItems = produce(state.newSaleLineItems, draftData => {
        draftData.map(sli => {
          const item = state.items.find(item => item.id === sli.itemId)
          if (item !== undefined && item.prod_id === updatedNewSaleItem.prodId && sli.qty === updatedNewSaleItem.qty) {
            sli.salePrice = updatedNewSaleItem.newPrice
          }
        })
      })
    },

    removeNewSaleItem(state, {payload: {removedNewSaleItem}}: PayloadAction<RemoveNewSaleItemPayload>) {
      state.items = state.items.map(item => {
        if (item.prod_id === removedNewSaleItem.prodId) {
          const newSaleLineItemsQty = state.newSaleLineItems.find(sli =>
            sli.itemId === item.id && sli.salePrice === removedNewSaleItem.price
          )?.qty ?? 0
          return {...item, qty: item.qty + newSaleLineItemsQty}
        }
        return item
      })
      state.items.forEach(item => {
        if (item.prod_id === removedNewSaleItem.prodId) {
          state.newSaleLineItems = state.newSaleLineItems.filter(sli =>
            !(sli.itemId === item.id && sli.salePrice === removedNewSaleItem.price)
          )
        }
      })
    },

    saveNewSaleSuccess(state, action: PayloadAction<SaveNewSalePayload>) {
      state.sales.push(action.payload.outputEndSale.sale)
      state.newSaleLineItems = []
      state.isLoading = false
      state.error = ''
    },

    editSLIPriceSuccess(state, action: PayloadAction<EditSLIPricePayload>) {
      const oldSLI = action.payload.editPriceData.old_sli
      const newSLI = action.payload.editPriceData.new_sli
      state.sales = state.sales.map(sale=>{
        const sale_line_items = sale.sale_line_items.map(sli=>{
          if(sli.item_id===oldSLI.item_id && sli.sale_price===oldSLI.sale_price && sli.qty === oldSLI.qty){
            return {...sli, sale_price: newSLI.sale_price}
          }
          return sli
        })
        return {...sale, sale_line_items}
      })
      state.newSaleLineItems = []
      state.isLoading = false
      state.error = ''
    },

  }
})

export default newSalesSlice.reducer