import {ProductType} from "./newProduct";
import _ from "lodash";
import {Product} from "../../schemas/base";

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
}
export const getProductData = (products: Product[], name: string): ProductData => {
  const product = _.chain(products)
    .filter(product => product.name === name)
    .last()
    .value()
  const price = product.price.toString()
  const type = product.type
  return ({price, type})
}

export const getProductColors = (products: Product[], name: string): string[] => {
  return _.chain(products)
    .filter(product => product.name.toLowerCase() === name.toLowerCase())
    .map(product => _.toString(product.shoes?.color))
    .sort()
    .uniq()
    .value()
}