export interface NewProducts {
  id?: number
  store_id: number
  type: ProductType
  name: string
  price_sell: number
  price_buy: number
  qty: number
  module: Modules
}

export enum ProductType {
  product = 'product',
  shoes = 'shoes'
}

export type Modules = null | Shoes

// --------------------------------------
export interface Shoes {
  width: WidthType
  color: string
  sizes: Size[]
}

interface Size {
  size: number
  length: number
  qty: number
}

export enum WidthType {
  medium = 'Medium',
  wide = 'Wide'
}

interface DefaultSeizesLength {
  [key: number]: number
}

export const defaultSeizesLength: DefaultSeizesLength = {
  35: 23,
  36: 23.5,
  37: 24,
  38: 24.5,
  39: 25,
  40: 25.5,
  41: 26.5,
  42: 27,
  43: 27.5,
  44: 28,
  45: 28.5,
  46: 29,
  48: 29.5,
  49: 30,
}


export const getDefaultSeizesLength = (selectedSize: number) => {
  let retValue = ''
  for (let size in defaultSeizesLength) {
    if (size == selectedSize.toString()) {
      retValue = defaultSeizesLength[size].toString()
      break
    }
  }
  return retValue
}
