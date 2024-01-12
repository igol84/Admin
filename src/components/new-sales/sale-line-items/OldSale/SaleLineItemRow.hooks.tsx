import {useState} from "react";
import {produce} from "immer";
import {FieldNames, FormFields} from "./SaleLineItemRow.types";
import {ViewSaleLineItem} from "../types";
import {useFetchAccess} from "../../../../hooks/pages";
import {editSLIPrice, removeProductInOldSale} from "../../../../store/actions/new-sales";
import {useAppSelector, useStoreId} from "../../../../hooks/redux";
import {CreateItem, EditSLIPrice, PutItemToOldSale, SaleLineItemKeys, UpdateItem} from "../../../../schemas/new-sale";
import {Sale} from "../../../../schemas/base";


interface UseForm {
  (viewSaleLineItem: ViewSaleLineItem, resetSelectedRow: () => void): [
    formData: FormFields,
    useError: (fieldName: FieldNames) => string,
    onPriceFieldChange: (price: string) => void,
    onConfirm: () => void,
    onRemove: () => void
  ]
}

export const useForm: UseForm = (viewSaleLineItem, resetSelectedRow) => {

  const useError = (fieldName: FieldNames) => formData[fieldName].error
  const initialFormFields: FormFields = {
    price: {value: viewSaleLineItem.salePrice.toString(), error: ''},
  }
  const [formData, setFormData] = useState<FormFields>(initialFormFields)

  const onPriceFieldChange = (price: string) => {
    if (Number(price) >= 0)
      setFormData(produce(prevFormData => {
        prevFormData.price.value = price
      }))
  }
  const dispatchEditSLIPrice = useFetchAccess(editSLIPrice)
  const {sales, items} = useAppSelector(state => state.newSalesSliceSlice)
  const storeId = useStoreId()
  const onConfirm = async () => {
    const sale = sales.find(sale => sale.id === viewSaleLineItem.saleId)
    if (sale) {
      const updatedNewSaleItem: EditSLIPrice[] = []
      sale.sale_line_items.forEach(sale_line_item => {
          if (sale_line_item.item.prod_id === viewSaleLineItem.productId
            && sale_line_item.sale_price === viewSaleLineItem.salePrice) {
            updatedNewSaleItem.push({
              old_sli: {
                sale_id: viewSaleLineItem.saleId,
                item_id: sale_line_item.item_id,
                sale_price: viewSaleLineItem.salePrice,
                qty: sale_line_item.qty
              },
              new_sli: {
                sale_id: viewSaleLineItem.saleId,
                item_id: sale_line_item.item_id,
                sale_price: Number(formData.price.value),
                qty: sale_line_item.qty
              }
            })
          }
        }
      )

      await dispatchEditSLIPrice(updatedNewSaleItem)
      resetSelectedRow()
    }
  }
  const dispatchRemoveProductInOldSale = useFetchAccess(removeProductInOldSale)
  const onRemove = async () => {
    const sale = sales.find(sale => sale.id === viewSaleLineItem.saleId) as Sale
    const listDeleteSLIs: SaleLineItemKeys[] = []
    const listNewItems: CreateItem[] = []
    const listUpdateItems: UpdateItem[] = []
    sale.sale_line_items.forEach(sale_line_item => {
      if (sale_line_item.item.prod_id === viewSaleLineItem.productId
        && sale_line_item.sale_price === viewSaleLineItem.salePrice) {
        listDeleteSLIs.push({
          sale_id: viewSaleLineItem.saleId,
          item_id: sale_line_item.item_id,
          sale_price: viewSaleLineItem.salePrice
        })
        const item = items.find(item => item.id === sale_line_item.item_id)
        if (!item) {
          listNewItems.push({
            prod_id: viewSaleLineItem.productId,
            store_id: storeId as number,
            qty: sale_line_item.qty,
            buy_price: sale_line_item.sale_price,
            date_buy: sale_line_item.item.date_buy
          })
        } else {
          listUpdateItems.push({
            id: sale_line_item.item_id,
            prod_id: viewSaleLineItem.productId,
            store_id: storeId as number,
            qty: item.qty + sale_line_item.qty,
            buy_price: sale_line_item.sale_price,
            date_buy: sale_line_item.item.date_buy
          })
        }
      }
    })
    const putItemToOldSale: PutItemToOldSale = {
      sale_id: viewSaleLineItem.saleId,
      list_del_sli: listDeleteSLIs,
      list_new_items: listNewItems,
      list_update_items: listUpdateItems,
      delete: sale.sale_line_items.length === listDeleteSLIs.length
    }
    await dispatchRemoveProductInOldSale(putItemToOldSale)
    resetSelectedRow()
  }

  return [formData, useError, onPriceFieldChange, onConfirm, onRemove]
}