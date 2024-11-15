import { createContext } from "react"
import { ProductContextType } from "../types/product";
export const ProductsContext = createContext<ProductContextType>({
  products: [],
  receipts: [],
  cart: [],
  totalCartProducts: 0,
  totalCartPrice: 0,
  sortedProducts: [],
  addProductToCart: () => false,
  addReceipt: () => { },
  getReceipt: () => undefined,
  removeProductFromCart: () => false,
  getProductsFromCart: () => [],
  clearCart: () => false,
  getProductById: () => undefined,
  updateProduct: () => { },
  createProduct: () => { },
  sortByPriceAscending: () => { },
  sortByPriceDescending: () => { },
  sortDefault: () => { }
});


