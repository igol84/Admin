import {Item, Place, Product, Seller} from "../../../schemas/base";
import _ from "lodash";
import {Module, ViewColor, ViewProduct, ViewShoes, ViewSize, ViewWidth} from "./types";
import {NewSaleLineItem} from "../../../schemas/new-sale";
import {ViewNewSaleLineItem, ViewPlace, ViewSeller, ViewSellersAndPlaces} from "../sale-line-items/types";


export const convertItems = (items: Item[]): ViewProduct[] => {
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

interface ConvertSaleLineItems {
  (items: Item[], newSaleLineItems: NewSaleLineItem[]): ViewNewSaleLineItem[]
}

const findItemById = (itemId: number, items: Item[]) => {
  return items.find(item => item.id === itemId)
}

const findProductInSaleLineItems = (vewSaleLineItems: ViewNewSaleLineItem[], prodId: number, price: number) => {
  return vewSaleLineItems.find(vewSaleLineItem =>
    vewSaleLineItem.prod_id === prodId && vewSaleLineItem.price === price
  )
}

export const convertSaleLineItems: ConvertSaleLineItems = (items, newSaleLineItems) => {

  let vewSaleLineItems: ViewNewSaleLineItem[] = []
  newSaleLineItems.forEach(newSaleLineItem => {
    const item = findItemById(newSaleLineItem.itemId, items)

    if (item) {
      const prod = findProductInSaleLineItems(vewSaleLineItems, item.prod_id, newSaleLineItem.salePrice)
      if (prod) {
        vewSaleLineItems = vewSaleLineItems.map(vewSaleLineItem => {
          if (vewSaleLineItem.prod_id === item.prod_id && vewSaleLineItem.price === newSaleLineItem.salePrice)
            return {...vewSaleLineItem, qty: vewSaleLineItem.qty + newSaleLineItem.qty}
          else
            return vewSaleLineItem
        })

      } else {
        const name = item.product.shoes
          ? `${item.product.name} ${item.product.shoes.color} ${item.product.shoes.width} ${item.product.shoes.size}`
          : item.product.name
        const viewSaleLineItem: ViewNewSaleLineItem = {
          prod_id: item.prod_id,
          name: name,
          price: newSaleLineItem.salePrice,
          qty: newSaleLineItem.qty
        }
        vewSaleLineItems.push(viewSaleLineItem)
      }

    }
  })
  return vewSaleLineItems
}

interface ConvertSellersAndPlaces {
  (sellers: Seller[], places: Place[]): ViewSellersAndPlaces
}

export const convertSellersAndPlaces: ConvertSellersAndPlaces = (sellers, places) => {
  const viewSellers: ViewSeller[] = []
  sellers.forEach(seller => {
    if (seller.active) {
      const viewSeller: ViewSeller = {id: seller.id, name: seller.name}
      viewSellers.push(viewSeller)
    }
  })
  const viewPlaces: ViewPlace[] = []
  places.forEach(place => {
    if (place.active) {
      const viewPlace: ViewPlace = {id: place.id, name: place.name}
      viewPlaces.push(viewPlace)
    }
  })
  const convertSaleLineItems: ViewSellersAndPlaces = {
    selectedPlaceId: viewSellers.length == 1 ? viewSellers[0].id.toString() : '-1',
    sellers: viewSellers,
    selectedSellerId : viewPlaces.length == 1 ? viewPlaces[0].id.toString() : '-1',
    places: viewPlaces
  }
  return convertSaleLineItems
}