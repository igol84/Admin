import {getDefaultSeizesLength, ProductType, Size} from "./types";
import _ from "lodash";
import {Product} from "../../schemas/base";
import {defaultSizesLength} from "./data";
import {SizeField} from "./AddNewProductFormTypes";

export const getProductNamesByType = (products: Product[], productType: keyof typeof ProductType): string[] => {
  return _.chain(products)
    .filter(product => product.type === productType)
    .map(product => product.name)
    .sort((a, b) => a.localeCompare(b))
    .uniq()
    .value()
}
type ProductData = {
  price: string
  type: ProductType
  sizes: null | Size[]
}
export const getProductData = (products: Product[], name: string): ProductData => {
  const filteredProducts = _.chain(products)
    .filter(product => product.name === name)
    .value()
  const price = filteredProducts[filteredProducts.length - 1].price.toString()
  const type = filteredProducts[filteredProducts.length - 1].type
  let sizes: null | Size[] = null
  if (type === 'shoes') {
    const sizesMap: Map<number, Size> = new Map()
    filteredProducts.forEach(product => {
      const sizeNum = product.shoes ? product.shoes.size : 36
      const length = product.shoes && product.shoes.length ? product.shoes.length : defaultSizesLength[sizeNum]
      const size: Size = {size: sizeNum, qty: 0, length}
      sizesMap.set(sizeNum, size)
    })
    const sizesNumbers: number[] = [...sizesMap.keys()].sort()
    sizes = sizesNumbers.map(sizeNumber => sizesMap.get(sizeNumber) as Size)
  }
  return ({price, type, sizes})
}

export const getProductColors = (products: Product[], name: string): string[] => {
  return _.chain(products)
    .filter(product => product.name.toLowerCase() === name.toLowerCase())
    .map(product => _.toString(product.shoes?.color))
    .sort()
    .uniq()
    .value()
}

export const rangeSizes = (from: number, to: number, half: boolean, productSizes: null | Size[]): SizeField[] => {
  const mapSizes = new Map()
  const step = half ? 0.5 : 1
  const sizesArray = _.range(from, to + 1, step)
  const filteredSizes = sizesArray.filter(size => size >= from && size <= to)
  const rangeData = filteredSizes.map(size => {
    return {size, qty: '0', length: getDefaultSeizesLength(size)}
  })
  rangeData.forEach(sizeDate => mapSizes.set(sizeDate.size, sizeDate))
  if (productSizes) {
    productSizes.forEach(sizeData => {
      if (sizeData.size >= from && sizeData.size <= to) {
        mapSizes.set(sizeData.size, {
          size: sizeData.size, qty: sizeData.qty.toString(), length: sizeData.length.toString()
        })
      }
    })
  }
  return _.orderBy([...mapSizes.values()], 'size')

}