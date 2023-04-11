import {Item, Product} from "../../../schemas/base";
import _ from "lodash";
import {Module, ViewColor, ViewProduct, ViewShoes, ViewSize, ViewWidth} from "./types";


export const convertItems = (items: Item[]) => {

  const products: Product[] = []
  const ids: number[] = []
  items.forEach(item => {
      if (item.qty > 0) {
        if (!(ids.includes(item.prod_id))) {
          let shoes = null
          if (item.product.type === 'shoes' && item.product.shoes != null) {
            shoes = {
              size: item.product.shoes.size,
              color: item.product.shoes.color,
              width: item.product.shoes.width ?? 'Medium',
              length: item.product.shoes.length ?? 0
            }
          }
          const product = {
            id: item.product.id,
            type: item.product.type,
            name: item.product.name,
            price: item.product.price,
            qty: item.qty,
            shoes: shoes
          }
          products.push(product)
          ids.push(item.prod_id)
        } else {
          products[products.findIndex(product => product.id === item.prod_id)].qty += item.qty
        }
      }
    }
  )
  const nameSorter = (product: Product) => product.name.toLowerCase()
  const colorSorter = (product: Product) => product.shoes?.color.toLowerCase()
  const withSorter = (product: Product) => product.shoes?.width
  const withSize = (product: Product) => product.shoes?.size

  const sortedProducts = _.orderBy(products, [nameSorter, colorSorter, withSorter, withSize])

  const isShoes = (product: ViewProduct | undefined): boolean => {
    if (product !== undefined)
      return product.module === Module.shoes
    return false
  }
  const groupedProducts: (ViewProduct)[] = []
  sortedProducts.forEach(product => {
    if (product.type === Module.shoes) {
      const size = product.shoes?.size ?? 0
      const width = product.shoes?.width ?? 'Medium'
      const lastProduct = groupedProducts.slice(-1)[0]
      const viewSize: ViewSize = {prod_id: product.id, size, price: product.price, qty: product.qty}
      const viewWidth: ViewWidth = {width, sizes: Array(viewSize)}
      const color = product.shoes?.color ?? ''
      const viewColor: ViewColor = {color, widths: Array(viewWidth)}
      if (!isShoes(lastProduct) || (isShoes(lastProduct) && lastProduct.name !== product.name)) {
        const viewShoes: ViewShoes = {
          module: Module.shoes, name: product.name, type: product.type, colors: Array(viewColor)
        }
        groupedProducts.push(viewShoes)
      } else if (isShoes(lastProduct) && lastProduct.name === product.name && product.shoes) {
        const shoes = groupedProducts.slice(-1)[0]
        if ('colors' in shoes) {
          if (shoes.colors.slice(-1)[0].color !== product.shoes.color) {
            shoes.colors.push(viewColor)
          } else {
            if (shoes.colors.slice(-1)[0].widths.slice(-1)[0].width !== product.shoes.width) {
              shoes.colors.slice(-1)[0].widths.push(viewWidth)
            } else {
              shoes.colors.slice(-1)[0].widths.slice(-1)[0].sizes.push(viewSize)
            }
          }
        }
      }
    } else {
      groupedProducts.push({
        id: product.id,
        name: product.name,
        qty: product.qty,
        price: product.price,
        module: Module.product
      })
    }
  })
  return groupedProducts
}