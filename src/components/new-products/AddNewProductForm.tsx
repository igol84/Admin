import React, {useLayoutEffect, useState} from 'react';
import {Box, Button, MenuItem} from "@mui/material";
import {
  fieldPositive,
  fieldPositiveNotNull,
  SimpleAutocomplete,
  SimpleField,
  SimpleSelect,
  SnackBarSuccess
} from "../Form";
import {produce} from "immer";
import TableSizes from "./TableSizes";
import _ from "lodash";
import {getDefaultSeizesLength, ProductType, WidthType} from "./types";
import {addNewProducts, requestProducts} from "../../store/actions/newProducts";
import {
  useDictionary,
  useFetchAccess,
  useIsLoadingDisplay,
  useLoaderAccess,
  useSuccessSnackbar
} from "../../hooks/pages";
import {
  FieldNames,
  FormFields,
  OnSizeFieldChange,
  RangeSizesType,
  SetterFieldCreator,
  SizeField
} from "./AddNewProductFormTypes";
import {useSubmit} from "./hooks";
import {useAppSelector} from "../../hooks/redux";
import LoadingCircular from "../LoadingCircular";
import {getProductColors, getProductData, getProductNamesByType, rangeSizes} from "./functions";
import SizesRange from "./TableSizesSizeRange";

const initialRangeSizes: RangeSizesType = {from: 36, to: 41, half: false}

const sizesArray: number[] = _.range(initialRangeSizes.from, initialRangeSizes.to + 1)
const initialDataSizes: SizeField[] = sizesArray.map(size => (
  {size, qty: '0', length: getDefaultSeizesLength(size), disable: false}
))

const initialFormFields: FormFields = {
  name: {value: '', items: [], selected: '', error: ''},
  priceBuy: {value: '0', error: ''},
  priceSell: {value: '', error: ''},
  productType: {value: ProductType.shoes, error: ''},
  qty: {value: '1', error: ''},
  color: {value: '', items: [], selected: '', error: ''},
  width: {value: WidthType.medium, items: [], error: ''},
  sizes: initialDataSizes
}

const AddNewProductForm = () => {
  const [formData, setFormData] = useState<FormFields>(initialFormFields)
  const [rangeSizesData, setRangeSizesData] = useState<RangeSizesType>(initialRangeSizes)
  const [openSuccessSnackbar, setOpenSuccessSnackbar, handleSuccessSnackbar] = useSuccessSnackbar()
  const d = useDictionary('newProducts')
  useLoaderAccess(requestProducts)
  const addNewProductsAccess = useFetchAccess(addNewProducts)

  const {isLoading, products} = useAppSelector(state => state.newProductsSlice)
  const showLoading = useIsLoadingDisplay(isLoading)

  const selectedType = formData.productType.value
  const selectedName = formData.name.selected

  useLayoutEffect(() => {
    if (selectedName) {
      const productData = getProductData(products, selectedName)
      setFormData(produce(prevFormData => {
        prevFormData.priceSell.value = productData.price
      }))
      if (productData.type === ProductType.shoes) {
        setFormData(produce(prevFormData => {
          prevFormData.color.items = getProductColors(products, selectedName)
        }))
        if (productData.sizes) {
          const dataSizes = rangeSizes(rangeSizesData.from, rangeSizesData.to, rangeSizesData.half, productData.sizes)
          setFormData(produce(prevFormData => {
            prevFormData.sizes = dataSizes
          }))
        }
      }
    } else {
      setFormData(produce(prevFormData => {
        prevFormData.color.items = []
      }))
    }
    setFormData(produce(prevFormData => {
      prevFormData.color.value = ''
      prevFormData.color.selected = ''
    }))
  }, [selectedName])

  useLayoutEffect(() => {
    const productDataSizes = selectedName ? getProductData(products, selectedName).sizes : null
    const dataSizes = rangeSizes(rangeSizesData.from, rangeSizesData.to, rangeSizesData.half, productDataSizes)
    setFormData(produce(prevFormData => {
      prevFormData.sizes = dataSizes
    }))
  }, [rangeSizesData])

  useLayoutEffect(() => {
    const productNames = getProductNamesByType(products, selectedType)
    setFormData(produce(prevFormData => {
      prevFormData.name.items = productNames
    }))
  }, [selectedType, products])

  const onSizeFieldChange: OnSizeFieldChange = (fieldName) => (field) => {
    const {size, value} = field
    const fieldIndex = formData.sizes.findIndex(field => field.size === size)
    setFormData(produce(prevFormData => {
      prevFormData.sizes[fieldIndex] = {...prevFormData.sizes[fieldIndex], [fieldName]: value}
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

  const setterFieldCreator: SetterFieldCreator = (field, valid = undefined) => value => {
    if (valid === undefined || !(!!valid(value)))
      setFormData(produce(prevFormData => {
        prevFormData[field].value = value
      }))
  }

  const onNameSelected = (value: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.name.selected = value
    }))
  }

  const onColorSelected = (value: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.color.selected = value
    }))
  }

  const useError = (fieldName: FieldNames) => formData[fieldName].error
  const resetForm = () => {
    setFormData(produce(prevFormData => {
      prevFormData.name.value = ''
      prevFormData.name.selected = ''
      prevFormData.priceBuy.value = '0'
      prevFormData.priceSell.value = '0'
      prevFormData.color.value = ''
      prevFormData.color.selected = ''
      prevFormData.sizes = initialDataSizes
    }))
    setRangeSizesData(initialRangeSizes)
  }
  const [validateDate, createData] = useSubmit()

  const onSubmit = async () => {
    if (validateDate(formData, setFormData)) {
      const data = createData(formData, setFormData)
      if (data) {
        await addNewProductsAccess(data)
        setOpenSuccessSnackbar(true)
        resetForm()
      }
    }
  }

  const isCheckedField = (field: any) => (name: any) => field === name
  const isCheckedProductType = isCheckedField(formData.productType.value)

  return (
    <>
      <Box sx={{display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', pb: '20px'}}>
        <Box width={150}>
          <SimpleSelect
            name='productType'
            label={d['productType']}
            value={formData.productType.value.toString()}
            setValue={onTypeChange}
          >
            {Object.values(ProductType).map((productType, id) => (
              <MenuItem key={id} value={productType}>{d[productType] ?? productType}</MenuItem>
            ))}
          </SimpleSelect>
        </Box>
        <Box sx={{width: '300px'}}>
          <SimpleAutocomplete
            name='name'
            label={d['productName']}
            value={formData.name.value}
            setValue={setterFieldCreator('name')}
            items={formData.name.items}
            setItem={onNameSelected}
            error={useError('name')}
            blurOnSelect
            focusText
            autoFocus={true}
          />
        </Box>
        <Box sx={{width: '150px'}}>
          <SimpleField
            type='number'
            name='price_buy'
            label={d['price_buy']}
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
            label={d['price_sell']}
            value={formData.priceSell.value.toString()}
            setValue={setterFieldCreator('priceSell', fieldPositive)}
            error={useError('priceSell')}
            focusText
            disabled={formData.name.selected !== ''}
          />
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
            label={d['qty']}
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
            <SimpleAutocomplete
              name='color'
              label={d['color']}
              value={formData.color.value}
              setValue={setterFieldCreator('color')}
              items={formData.color.items}
              setItem={onColorSelected}
              error={useError('color')}
              blurOnSelect
              focusText
            />
          </Box>
          <Box width={150}>
            <SimpleSelect
              name='width'
              label={d['width']}
              value={formData.width.value}
              setValue={setterFieldCreator('width')}
            >
              {Object.values(WidthType).map((widthType, id) => (
                <MenuItem key={id} value={widthType}>{d[widthType] ?? widthType}</MenuItem>
              ))}
            </SimpleSelect>
          </Box>
          <Box>
            <SizesRange rangeSizes={rangeSizesData} setRangeSizes={setRangeSizesData}/>
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
          {d['add_button']}
        </Button>
      </Box>
      <LoadingCircular show={showLoading}/>
      <SnackBarSuccess label={d['SuccessfulAdded']} openSuccessSnackbar={openSuccessSnackbar}
                       handleSuccessSnackbar={handleSuccessSnackbar}/>
    </>
  );
};

export default AddNewProductForm;