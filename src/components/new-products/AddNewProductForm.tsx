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
  qty: string
  length: string
}

type FormFields = {
  name: Field<string>
  priceBuy: Field<string>
  priceSell: Field<string>
  productType: Field<ProductType>
  qty: Field<string>
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
  {size, qty: '0', length: ''}
))

const initialFormFields: FormFields = {
  name: {value: '', error: ''},
  priceBuy: {value: '0', error: ''},
  priceSell: {value: '', error: ''},
  productType: {value: ProductType.shoes, error: ''},
  qty: {value: '0', error: ''},
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
      {size, qty: '0', length: ''}
    ))
    setFormData(produce(prevFormData => {
      prevFormData.sizes = dataSizes
    }))
  }, [rangeSizes])

  const onSubmit = async () => {
    if (validateDate()) {
      const data: null | NewProducts = createData()
      if (data) {
        await addNewProductsAccess(data)
        resetForm()
      }

    }
  }

  const onSizeFieldQtyChange = (field: { size: number, qty: string }) => {
    const {size, qty} = field
    const fieldIndex = formData.sizes.findIndex(field => field.size === size)
    setFormData(produce(prevFormData => {
      prevFormData.sizes[fieldIndex] = {...prevFormData.sizes[fieldIndex], qty}
    }))
  }
  const onSizeFieldLengthChange = (field: { size: number, length: string }) => {
    const {size, length} = field
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
    if (
      checkError('priceBuy', fieldRequired(formData.priceBuy.value)) ||
      checkError('priceBuy', fieldPositive(Number(formData.priceBuy.value)))
    )
      isValid = false
    if (
      Number(formData.priceSell.value) > 0 &&
      checkError('priceSell', fieldPositive(Number(formData.priceSell.value)))
    )
      isValid = false
    if (formData.productType.value === ProductType.product) {
      if (checkError('qty', fieldPositiveNotNull(Number(formData.qty.value))))
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
        sizes: formData.sizes.filter(fieldSize => Number(fieldSize.qty) > 0).map((fieldSize) => {
          return {size: fieldSize.size, qty: Number(fieldSize.qty), length: Number(fieldSize.length)}
        })
      }
    } else return null
  }

  const createData = () => {
    if (storeId !== null) {
      const data: NewProducts = {
        store_id: storeId,
        type: formData.productType.value,
        name: formData.name.value,
        price_sell: Number(formData.priceSell.value),
        price_buy: Number(formData.priceBuy.value),
        qty: Number(formData.qty.value),
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
            error={useError('name')}
            focusText
          />
        </Box>
        <Box sx={{width: '150px'}}>
          <SimpleField
            type='number'
            name='price_buy'
            label='price_buy'
            value={formData.priceBuy.value.toString()}
            setValue={setterCreator('priceBuy')}
            error={useError('priceBuy')}
            focusText
          />
        </Box>
        <Box sx={{width: '150px'}}>
          <SimpleField
            type='number'
            name='price_sell'
            label='price_sell'
            value={formData.priceSell.value.toString()}
            setValue={setterCreator('priceSell')}
            error={useError('priceSell')}
            focusText
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
            error={useError('qty')}
            focusText
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
              error={useError('color')}
              focusText
            />
          </Box>
          <Box width={150}>
            <SimpleField
              name='width'
              label='width'
              value={formData.width.value}
              setValue={setterCreator('width')}
              error={useError('width')}
              focusText
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