import React, {useLayoutEffect, useState} from 'react';
import {Box, Button, MenuItem} from "@mui/material";
import {fieldPositive, fieldPositiveNotNull, SimpleAutocomplete, SimpleField, SimpleSelect} from "../Form";
import produce from "immer";
import TableSizes from "./TableSizes";
import _ from "lodash";
import {ProductType} from "../../schemas/items";
import {addNewProducts, requestProducts} from "../../store/actions/new-products";
import {useFetchAccess, useIsLoadingDisplay, useLoaderAccess} from "../../hooks/pages";
import {
  FieldNames,
  FormFields,
  OnSizeFieldChange,
  RangeSizesType,
  SetterFieldCreator,
  SizeField
} from "./AddNewProductFormTypes";
import {useSubmit} from "./AddNewProductFormOnSubmit";
import {Product} from "../../schemas/product";
import {useAppSelector} from "../../hooks/redux";
import LoadingCircular from "../LoadingCircular";


const initialRangeSizes: RangeSizesType = {from: 36, to: 41}

const sizesArray = _.range(initialRangeSizes.from, initialRangeSizes.to + 1)
const initialDataSizes: SizeField[] = sizesArray.map(size => (
  {size, qty: '0', length: ''}
))

const initialFormFields: FormFields = {
  name: {value: '', items: [], selected: '', error: ''},
  priceBuy: {value: '0', error: ''},
  priceSell: {value: '', error: ''},
  productType: {value: ProductType.shoes, error: ''},
  qty: {value: '1', error: ''},
  color: {value: '', error: ''},
  width: {value: '', error: ''},
  sizes: initialDataSizes
}

const getProductNames = (products: Product[], selectedType: keyof typeof ProductType) => {
  return _.chain(products).filter(product => product.type === selectedType)
    .map(product => _.capitalize(product.name)).sort().uniq().value()
}
const getProductData = (products: Product[], name: string) => {
  console.log(_.chain(products).filter(product => product.name.toLowerCase() === name.toLowerCase()).value())
  return _.chain(products).filter(product => product.name.toLowerCase() === name.toLowerCase()).last().value()
}

const AddNewProductForm = () => {
  const [formData, setFormData] = useState<FormFields>(initialFormFields)
  const [rangeSizes, setRangeSizes] = useState<RangeSizesType>(initialRangeSizes)

  useLoaderAccess(requestProducts)
  const addNewProductsAccess = useFetchAccess(addNewProducts)

  const {isLoading, products} = useAppSelector(state => state.newProductsSlice)
  const showLoading = useIsLoadingDisplay(isLoading)

  const selectedType = formData.productType.value
  const selectedName = formData.name.selected

  useLayoutEffect(() => {
    if (selectedName) {
      const selectedProduct: Product = (getProductData(products, selectedName))
      setFormData(produce(prevFormData => {
        prevFormData.priceSell.value = selectedProduct.price.toString()
      }))
    }
  }, [selectedName])

  useLayoutEffect(() => {
    const sizesArray = _.range(rangeSizes.from, rangeSizes.to + 1)
    const dataSizes: SizeField[] = sizesArray.map(size => (
      {size, qty: '0', length: ''}
    ))
    setFormData(produce(prevFormData => {
      prevFormData.sizes = dataSizes
    }))
  }, [rangeSizes])


  useLayoutEffect(()=> {
    setFormData(produce(prevFormData => {
      prevFormData.name.items = getProductNames(products, selectedType)
    }))
  }, [selectedType, products])

  const onSizeFieldChange: OnSizeFieldChange = (fieldName) => (field) => {
    const {size, value} = field
    const fieldIndex = formData.sizes.findIndex(field => field.size === size)
    setFormData(produce(prevFormData => {
      prevFormData.sizes[fieldIndex] = {...prevFormData.sizes[fieldIndex], [fieldName]: value}
    }))
  }

  const setterFieldCreator: SetterFieldCreator = (field, valid = undefined) => value => {
    if (valid === undefined || !(!!valid(value)))
      setFormData(produce(prevFormData => {
        prevFormData[field].value = value
      }))
  }

  const onTypeChange = (value: keyof typeof ProductType) => {
    if (formData.name.items.includes(formData.name.selected.trim())) {
      setFormData(produce(prevFormData => {
        prevFormData.name.value = ''
      }))
    }
    setFormData(produce(prevFormData => {
      prevFormData.name.selected = ''
    }))
    return setterFieldCreator('productType')(value)
  }

  const onNameSelected = (value: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.name.selected = value
    }))
  }

  const useError = (fieldName: FieldNames) => formData[fieldName].error
  const resetForm = () => setFormData(initialFormFields)
  const [validateDate, createData] = useSubmit()

  const onSubmit = async () => {
    if (validateDate(formData, setFormData)) {
      const data = createData(formData, setFormData)
      if (data) {
        console.log(data)
        await addNewProductsAccess(data)
        resetForm()
      }
    }
  }

  const isCheckedField = (field: any) => (name: any) => field === name
  const isCheckedProductType = isCheckedField(formData.productType.value)

  return (
    <>
      <Box sx={{display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', pb: '20px'}}>
        <Box sx={{width: '300px'}}>
          <SimpleAutocomplete name='name' value={formData.name.value} setValue={setterFieldCreator('name')}
                              items={formData.name.items} setItem={onNameSelected}/>
        </Box>
        <Box sx={{width: '150px'}}>
          <SimpleField
            type='number'
            name='price_buy'
            label='price_buy'
            value={formData.priceBuy.value.toString()}
            setValue={setterFieldCreator('priceBuy', fieldPositive)}
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
            setValue={setterFieldCreator('priceSell', fieldPositive)}
            error={useError('priceSell')}
            focusText
            disabled={formData.name.selected !== ''}
          />
        </Box>
        <Box width={150}>
          <SimpleSelect
            name='productType'
            label={'product Type'}
            value={formData.productType.value.toString()}
            setValue={onTypeChange}
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
            value={formData.qty.value}
            setValue={setterFieldCreator('qty', fieldPositiveNotNull)}
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
              setValue={setterFieldCreator('color')}
              error={useError('color')}
              focusText
            />
          </Box>
          <Box width={150}>
            <SimpleField
              name='width'
              label='width'
              value={formData.width.value}
              setValue={setterFieldCreator('width')}
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
            onSizeFieldQtyChange={onSizeFieldChange('qty')}
            onSizeFieldLengthChange={onSizeFieldChange('length')}
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
      <LoadingCircular show={showLoading}/>
    </>
  );
};

export default AddNewProductForm;