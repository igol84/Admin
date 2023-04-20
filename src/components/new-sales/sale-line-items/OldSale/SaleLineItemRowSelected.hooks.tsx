import {useState} from "react";
import produce from "immer";
import {FieldNames, FormFields} from "./SaleLineItemRowSelected.types";
import {ViewSaleLineItem} from "../types";
import {useFetchAccess} from "../../../../hooks/pages";
import {editSLIPrice} from "../../../../store/actions/new-sales";
import {useAppSelector} from "../../../../hooks/redux";
import {EditSLIPrice} from "../../../../schemas/new-sale";


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
  const {sales} = useAppSelector(state => state.newSalesSliceSlice)
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

  const onRemove = () => null

  return [formData, useError, onPriceFieldChange, onConfirm, onRemove]
}