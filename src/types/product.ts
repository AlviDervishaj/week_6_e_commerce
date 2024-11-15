import { CartItem } from "./cart"

export interface ProductType {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: ProductRating
}

export interface ProductRating {
  rate: number
  count: number
}

export interface ReceiptType {
  id: number
  date: string
  products: { productId: number, quantity: number }[]
}

export interface ProductContextType {
  products: ProductType[]
  sortedProducts: ProductType[]
  cart: CartItem[]
  totalCartProducts: number
  totalCartPrice: number
  getReceipt: (id: number) => ReceiptType | undefined
  createProduct: (product: ProductType) => void
  addReceipt: (receipt: ReceiptType) => void
  addProductToCart: (product: ProductType) => boolean
  removeProductFromCart: (product: ProductType) => boolean
  getProductsFromCart: () => Array<ProductType & { quantity: number }>
  receipts: ReceiptType[]
  updateProduct: (product: ProductType) => void
  clearCart: () => boolean
  getProductById: (id: number) => ProductType | undefined
  sortByPriceAscending: () => void
  sortByPriceDescending: () => void
  sortDefault: () => void
}
