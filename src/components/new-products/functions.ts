import {Product} from "../../schemas/product";
import {ProductType} from "../../schemas/items";
import _ from "lodash";

export const getProductNames = (products: Product[], selectedType: keyof typeof ProductType) => {
  return _.chain(products)
    .filter(product => product.type === selectedType)
    .map(product => _.capitalize(product.name))
    .sort()
    .uniq()
    .value()
}
export const getProductData = (products: Product[], name: string) => {
  return _.chain(products)
    .filter(product => product.name.toLowerCase() === name.toLowerCase())
    .last()
    .value()
}

export const getProductColors = (products: Product[], name: string) => {
  return _.chain(products)
    .filter(product => product.name.toLowerCase() === name.toLowerCase())
    .map(product => _.lowerCase(product.shoes.color))
    .sort()
    .uniq()
    .value()
}