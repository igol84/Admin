import {NewProducts} from "../../schemas/new-products";
import {ProductType} from "./types";
import _ from "lodash";

export const getProductNames = (products: NewProducts[], selectedType: keyof typeof ProductType) => {
  return _.chain(products)
    .filter(product => product.type === selectedType)
    .map(product => _.capitalize(product.name))
    .sort()
    .uniq()
    .value()
}
export const getProductData = (products: NewProducts[], name: string) => {
  return _.chain(products)
    .filter(product => product.name.toLowerCase() === name.toLowerCase())
    .last()
    .value()
}

export const getProductColors = (products: NewProducts[], name: string) => {
  return _.chain(products)
    .filter(product => product.name.toLowerCase() === name.toLowerCase())
    .map(product => _.lowerCase(product.shoes.color))
    .sort()
    .uniq()
    .value()
}