import {Item, Place, Product, Sale, Seller} from "../../schemas/base";
import _ from "lodash";
import {Module, ViewColor, ViewProduct, ViewShoes, ViewSize, ViewWidth} from "./items/types";
import {NewSaleLineItem} from "../../schemas/new-sale";
import {
  ViewFormData,
  ViewNewSaleLineItem,
  ViewPlace,
  ViewSale,
  ViewSaleLineItem,
  ViewSeller,
  ViewTotal
} from "./sale-line-items/types";


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

const findItemById = (itemId: number, items: Item[]) => {
  return items.find(item => item.id === itemId)
}


const findProductInSaleLineItems = (vewSaleLineItems: ViewNewSaleLineItem[], prodId: number, price: number) => {
  return vewSaleLineItems.find(vewSaleLineItem =>
    vewSaleLineItem.prod_id === prodId && vewSaleLineItem.price === price
  )
}

interface ConvertSaleLineItems {
  (items: Item[], newSaleLineItems: NewSaleLineItem[]): ViewNewSaleLineItem[]
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

interface ConvertFormData {
  (sellers: Seller[], places: Place[], selectedDate: string, onSetSelectedDate: (date: string) => void):
    ViewFormData
}

export const convertFormData: ConvertFormData = (sellers, places, selectedDate, onSetSelectedDate) => {
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
  const convertSaleLineItems: ViewFormData = {
    selectedPlaceId: viewSellers.length == 1 ? viewSellers[0].id.toString() : '-1',
    sellers: viewSellers,
    selectedSellerId: viewPlaces.length == 1 ? viewPlaces[0].id.toString() : '-1',
    places: viewPlaces,
    selectedDate,
    onSetSelectedDate
  }
  return convertSaleLineItems
}

interface ConvertSales {
  (sales: Sale[]): ViewSale[]
}

export const convertSales: ConvertSales = (sales) => {
  const viewSale: ViewSale[] = sales.map(sale => {
    const salLineItemsMap = new Map<string, ViewSaleLineItem>()
    sale.sale_line_items.forEach(sli => {
      const saleLineItemKey = `${sli.item.prod_id} - ${sli.sale_price}`
      const viewSaleLineItem = salLineItemsMap.get(saleLineItemKey)
      if (viewSaleLineItem) {
        const newViewSaleLineItem: ViewSaleLineItem = {...viewSaleLineItem, qty: viewSaleLineItem.qty + sli.qty}
        salLineItemsMap.set(saleLineItemKey, newViewSaleLineItem)
      } else {
        const width = sli.item.product.shoes?.width === "Medium" ? "" : sli.item.product.shoes?.width
        const name = sli.item.product.shoes
          ? `${sli.item.product.name} ${sli.item.product.shoes.color} ${width}
         ${sli.item.product.shoes.size}`
          : sli.item.product.name
        const viewSaleLineItem: ViewSaleLineItem = {
          saleId: sli.sale_id,
          productId: sli.item.prod_id,
          name,
          qty: sli.qty,
          salePrice: sli.sale_price
        }
        salLineItemsMap.set(saleLineItemKey, viewSaleLineItem)
      }
    })
    const salLineItems = [...salLineItemsMap.values()]
    return {id: sale.id, place: sale.place.name, seller: sale.seller.name, salLineItems}
  })
  return viewSale
}


const getItemPrice = (itemId: number, items: Item[]) => {
  const item = items.find(item => item.id === itemId) as Item
  return item.buy_price
}

interface GetTotal {
  (sales: Sale[], newSaleLineItems: NewSaleLineItem[], items: Item[]): ViewTotal
}

export const getTotal: GetTotal = (sales, newSaleLineItems, items) => {
  const proceedsOldSales = sales.reduce(
    (total, sale) => total + sale.sale_line_items.reduce(
      (total, sli) => total + sli.sale_price * sli.qty
      , 0)
    , 0)
  const proceedNewSale = newSaleLineItems.reduce((total, sale) => total + sale.salePrice * sale.qty, 0)

  const incomeOldSales = sales.reduce(
    (total, sale) => total + sale.sale_line_items.reduce(
      (total, sli) => total + (sli.sale_price - sli.item.buy_price) * sli.qty
      , 0)
    , 0)
  const incomeNewSale = newSaleLineItems.reduce(
    (total, sale) => total + (sale.salePrice - getItemPrice(sale.itemId, items)) * sale.qty
    , 0)
  const proceeds = proceedsOldSales + proceedNewSale
  const income = incomeOldSales + incomeNewSale
  return {proceeds, income}
}


