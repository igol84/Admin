import React, {useLayoutEffect, useState} from 'react';
import {Box, Button, MenuItem} from "@mui/material";
import {fieldPositive, fieldPositiveNotNull, fieldRequired, SimpleField, SimpleSelect} from "../Form";
import produce from "immer";
import TableSizes from "./TableSizes";
import _ from "lodash";
import {NewProducts} from "../../schemas/new-products";
import {useStoreId} from "../../hooks/redux";
import {addNewProducts} from "../../store/actions/new-products";
import {useFetchAccess} from "../../hooks/pages";



enum ProductType {
  product = 'product',
  shoes = 'shoes'
}

type Field<T> = {
  value: T
  error: string
}

export interface SizeField {
  size: number
  qty: number
  length: number
}

type FormFields = {
  name: Field<string>
  priceBuy: Field<number>
  priceSell: Field<number>
  productType: Field<ProductType>
  qty: Field<number>
  color: Field<string>
  width: Field<string>
  sizes: SizeField[]
}

type FieldNames = keyof Omit<FormFields, 'sizes'>

export interface RangeSizesType {
  from: number
  to: number
}

const initialRangeSizes: RangeSizesType = {from: 36, to: 41}

const sizesArray = _.range(initialRangeSizes.from, initialRangeSizes.to + 1)
const initialDataSizes: SizeField[] = sizesArray.map(size => (
  {size, qty: 0, length: 0}
))

const initialFormFields: FormFields = {
  name: {value: '', error: ''},
  priceBuy: {value: 0, error: ''},
  priceSell: {value: 0, error: ''},
  productType: {value: ProductType.shoes, error: ''},
  qty: {value: 0, error: ''},
  color: {value: '', error: ''},
  width: {value: '', error: ''},
  sizes: initialDataSizes
}


const AddNewProductForm = () => {
  const [formData, setFormData] = useState<FormFields>(initialFormFields)
  const [rangeSizes, setRangeSizes] = useState<RangeSizesType>(initialRangeSizes)
  const storeId = useStoreId()
  const addNewProductsAccess = useFetchAccess(addNewProducts)

  useLayoutEffect(() => {
    const sizesArray = _.range(rangeSizes.from, rangeSizes.to + 1)
    const dataSizes: SizeField[] = sizesArray.map(size => (
      {size, qty: 0, length: 0}
    ))
    setFormData(produce(prevFormData => {
      prevFormData.sizes = dataSizes
    }))
  }, [rangeSizes])

  const onSubmit = async () => {
    if (validateDate()) {
      const data: null | NewProducts = createData()
      if(data){
        await addNewProductsAccess(data)
        // resetForm()
      }

    }
  }

  const onSizeFieldQtyChange = ({size, qty}: Pick<SizeField, 'size' | 'qty'>) => {
    const fieldIndex = formData.sizes.findIndex(field => field.size === size)
    setFormData(produce(prevFormData => {
      prevFormData.sizes[fieldIndex] = {...prevFormData.sizes[fieldIndex], qty}
    }))
  }
  const onSizeFieldLengthChange = ({size, length}: Pick<SizeField, 'size' | 'length'>) => {
    const fieldIndex = formData.sizes.findIndex(field => field.size === size)
    setFormData(produce(prevFormData => {
      prevFormData.sizes[fieldIndex] = {...prevFormData.sizes[fieldIndex], length}
    }))
  }
  const setterCreator = (field: FieldNames) => (value: string) => {
    setFormData(produce(prevFormData => {
      prevFormData[field].value = value
    }))
  }
  const checkError = (field: FieldNames, error: string) => {
    setFormData(produce(prevFormData => {
      prevFormData[field].error = error
    }))
    return error
  }
  const useError = (fieldName: FieldNames) => formData[fieldName].error
  const resetForm = () => setFormData(initialFormFields)


  const validateDate = () => {
    let isValid = true
    if (checkError('name', fieldRequired(formData.name.value)))
      isValid = false
    if (checkError('priceBuy', fieldRequired(String(formData.priceBuy.value))) ||
      checkError('priceBuy', fieldPositive(Number(formData.priceBuy.value))))
      isValid = false
    if (checkError('priceSell', fieldPositive(formData.priceSell.value)))
      isValid = false
    if (formData.productType.value === ProductType.product) {
      if (checkError('qty', fieldPositiveNotNull(formData.qty.value)))
        isValid = false
    } else if (formData.productType.value === ProductType.shoes) {

    }
    return isValid
  }


  const getModuleData = (SelectedProductType: ProductType) => {
    if (SelectedProductType === ProductType.shoes) {
      return {
        width: formData.width.value,
        color: formData.color.value,
        sizes: formData.sizes.filter(fieldSize => fieldSize.qty > 0)
      }
    } else return null
  }

  const createData = () => {
    if (storeId !== null) {
      const data: NewProducts = {
        store_id: storeId,
        type: formData.productType.value,
        name: formData.name.value,
        price_sell: formData.priceSell.value,
        price_buy: formData.priceBuy.value,
        qty: formData.qty.value,
        module: getModuleData(formData.productType.value)
      }
      return data
    }
    return null
  }


  const isCheckedField = (field: any) => (name: any) => field === name
  const isCheckedProductType = isCheckedField(formData.productType.value)

  return (
    <>
      <Box sx={{display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', pb: '20px'}}>
        <Box sx={{width: '300px'}}>
          <SimpleField
            name='name'
            label='Name'
            value={formData.name.value}
            setValue={setterCreator('name')}
            focusText
            error={useError('name')}
          />
        </Box>
        <Box sx={{width: '150px'}}>
          <SimpleField
            type='number'
            name='price_buy'
            label='price_buy'
            value={formData.priceBuy.value.toString()}
            setValue={setterCreator('priceBuy')}
            focusText
            error={useError('priceBuy')}
          />
        </Box>
        <Box sx={{width: '150px'}}>
          <SimpleField
            type='number'
            name='price_sell'
            label='price_sell'
            value={formData.priceSell.value.toString()}
            setValue={setterCreator('priceSell')}
            focusText
            error={useError('priceSell')}
          />
        </Box>
        <Box width={150}>
          <SimpleSelect
            name='productType'
            label={'product Type'}
            value={formData.productType.value.toString()}
            setValue={setterCreator('productType')}
          >
            {Object.values(ProductType).map((productType, id) => (
              <MenuItem key={id} value={productType}>{productType}</MenuItem>
            ))}
          </SimpleSelect>
        </Box>
      </Box>
      <Box
        sx={{
          display: isCheckedProductType('product') ? 'flex' : 'none',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          pb: '20px'
        }}
      >
        <Box width={150}>
          <SimpleField
            type='number'
            name='qty'
            label='qty'
            value={formData.qty.value.toString()}
            setValue={setterCreator('qty')}
            focusText
            error={useError('qty')}
          />
        </Box>
      </Box>
      <Box sx={{
        display: isCheckedProductType('shoes') ? 'flex' : 'none',
        gap: '10px',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        pb: '20px'
      }}>
        <Box sx={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          pb: '20px'
        }}>

          <Box width={150}>
            <SimpleField
              name='color'
              label='color'
              value={formData.color.value}
              setValue={setterCreator('color')}
              focusText
              error={useError('color')}
            />
          </Box>
          <Box width={150}>
            <SimpleField
              name='width'
              label='width'
              value={formData.width.value}
              setValue={setterCreator('width')}
              focusText
              error={useError('width')}
            />
          </Box>
        </Box>
        <Box sx={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          pb: '20px'
        }}>
          <TableSizes
            rangeSizes={rangeSizes}
            setRangeSizes={setRangeSizes}
            dataSizes={formData.sizes}
            onSizeFieldQtyChange={onSizeFieldQtyChange}
            onSizeFieldLengthChange={onSizeFieldLengthChange}
          />
        </Box>
      </Box>
      <Box sx={{display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center'}}>
        <Button
          type='submit'
          color='secondary'
          variant="contained"
          sx={{ml: 1, px: 5, height: '43px'}}
          disabled={false}
          onClick={onSubmit}
        >
          {'add_button'}
        </Button>
      </Box>
    </>
  );
};

export default AddNewProductForm;