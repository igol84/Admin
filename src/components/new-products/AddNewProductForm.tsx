import React, {useState} from 'react';
import {Box, Button, MenuItem} from "@mui/material";
import {SimpleField, SimpleSelect} from "../Form";
import produce from "immer";


enum ProductType {
  product = 'product',
  shoes = 'shoes'
}

interface Product {
  qty: number
}

interface Size {
  size: number
  length: number
  qty: number
}

interface Shoes {
  color: string
  width: string
  sizes: Size[]
}

interface initialValuesType extends Product, Shoes {
  name: string
  price_buy: number
  price_sell: number
  productType: ProductType
}

type Field<T> = {
  value: T
  error: string
}

type FormFields = {
  name: Field<string>
  priceBuy: Field<number | ''>
  priceSell: Field<number>
  productType: Field<ProductType>
  qty: Field<number>
  color: Field<string>
  width: Field<string>
}

type FieldNames = keyof FormFields

const initialFormFields: FormFields = {
  name: {value: '', error: ''},
  priceBuy: {value: '', error: ''},
  priceSell: {value: 0, error: ''},
  productType: {value: ProductType.shoes, error: ''},
  qty: {value: 0, error: ''},
  color: {value: '', error: ''},
  width: {value: '', error: ''}
}

const AddNewProductForm = () => {
  const [formData, setFormData] = useState<FormFields>(initialFormFields)

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

  const fieldRequired = (value: string) => {
    if (value === '') {
      return 'required'
    }
    return ''
  }

  const fieldPositive = (value: number) => {
    if (value < 0) {
      return 'positive'
    }
    return ''
  }

  const fieldPositiveNotNull = (value: number) => {
    if (value <= 0) {
      return 'positive, more than zero'
    }
    return ''
  }

  const validateDate = () => {
    let isValid = true
    if (checkError('name', fieldRequired(formData.name.value) ))
      isValid = false
    if (checkError('priceBuy', fieldRequired(String(formData.priceBuy.value))) ||
      checkError('priceBuy', fieldPositive(Number(formData.priceBuy.value))))
      isValid = false
    if (checkError('priceSell', fieldPositive(formData.priceSell.value)))
      isValid = false
    if (formData.productType.value === ProductType.product) {
      if (checkError('qty', fieldPositiveNotNull(formData.qty.value)))
        isValid = false
    }
    else if(formData.productType.value === ProductType.shoes){

    }
    return isValid
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(validateDate()) {
      resetForm()
    }
  }

  const isCheckedField = (field: any) => (name: any) => field === name
  const isCheckedProductType = isCheckedField(formData.productType.value)

  return (
    <form onSubmit={onSubmit}>
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
            label="price_sell"
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
            label="qty"
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
        flexWrap: 'wrap',
        justifyContent: 'center',
        pb: '20px'
      }}>
        <Box width={150}>
          <SimpleField
            name='color'
            label="color"
            value={formData.color.value}
            setValue={setterCreator('color')}
            focusText
            error={useError('color')}
          />
        </Box>
        <Box width={150}>
          <SimpleField
            name='width'
            label="width"
            value={formData.width.value}
            setValue={setterCreator('width')}
            focusText
            error={useError('width')}
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
        >
          {'add_button'}
        </Button>
      </Box>
    </form>
  );
};

export default AddNewProductForm;