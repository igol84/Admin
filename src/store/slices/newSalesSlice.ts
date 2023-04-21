import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Item, Place, Sale, Seller} from "../../schemas/base";
import produce from "immer";
import {
  EditSLIPrice,
  NewSaleLineItem,
  OutputEndSale,
  PutItemToOldSale,
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
  editPriceData: EditSLIPrice[]
}

export interface RemoveProductInOldSalePayload {
  putItemToOldSale: PutItemToOldSale
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
      state.items = produce(state.items, draftData => {
        draftData.map(item => {
          if (item.prod_id === removedNewSaleItem.prodId) {
            const newSaleLineItemsQty = state.newSaleLineItems.find(sli =>
              sli.itemId === item.id && sli.salePrice === removedNewSaleItem.price
            )?.qty ?? 0
            item.qty = item.qty + newSaleLineItemsQty
          }
        })
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
      action.payload.editPriceData.forEach(editPriceData => {
        const oldSLI = editPriceData.old_sli
        const newSLI = editPriceData.new_sli
        state.sales = produce(state.sales, draftData => {
          draftData.map(sale => {
            sale.sale_line_items = produce(sale.sale_line_items, draftData => {
              draftData.map(sli => {
                if (sli.item_id === oldSLI.item_id && sli.sale_price === oldSLI.sale_price && sli.qty === oldSLI.qty) {
                  sli.sale_price = newSLI.sale_price
                }
              })
            })
          })
        })
      })

      state.isLoading = false
      state.error = ''
    },

    removeProductInOldSale(state, action: PayloadAction<RemoveProductInOldSalePayload>) {
      const putItemToOldSale = action.payload.putItemToOldSale
      const delSLIs = action.payload.putItemToOldSale.list_del_sli
      const updateItems = action.payload.putItemToOldSale.list_update_items
      if (putItemToOldSale.delete) {
        state.sales = state.sales.filter(sale => sale.id !== putItemToOldSale.sale_id)
      } else {
        const sale = state.sales.find(sale => sale.id === putItemToOldSale.sale_id) as Sale
        delSLIs.forEach(delSLI => {
          sale.sale_line_items = sale.sale_line_items.filter(sli =>
            !(sli.item_id === delSLI.item_id && sli.sale_price === delSLI.sale_price)
          )
        })
      }
      updateItems.forEach(updateItem => {
        state.items = produce(state.items, draftData => {
          draftData.map(item => {
            if (item.id === updateItem.id) {
              item.qty = updateItem.qty
            }
          })
        })
      })
      state.isLoading = false
      state.error = ''
    },

  }
})

export default newSalesSlice.reducer