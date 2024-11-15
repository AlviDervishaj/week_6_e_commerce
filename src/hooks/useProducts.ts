import { useEffect, useMemo, useReducer } from 'react';
import { ProductType, ReceiptType } from '../types/product';
import { Cart, CartItem } from '../types/cart';

const PRODUCTS_API = "https://fakestoreapi.com/products";
const CART_API = "https://fakestoreapi.com/carts";
const USER_ID = 2;
const ITEM_PER_PAGE = 16;

type InitialStateType = {
  products: ProductType[];
  cart: CartItem[];
  sortedProducts: ProductType[];
  receipts: ReceiptType[];
  categories: string[];
  error: string;
}

const initialState: InitialStateType = {
  products: [],
  cart: [],
  sortedProducts: [],
  receipts: [],
  categories:  [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
    ] as const,
  error: "",
}

type ActionType =
  | { type: "set_products", payload: ProductType[] }
  | { type: "set_error", payload: string }
  | { type: "set_cart", payload: Cart[] }
  | { type: "add_to_cart", payload: CartItem }
  | { type: "add_product", payload: ProductType }
  | { type: "add_receipt", payload: ReceiptType }
  | { type: "edit_product", payload: ProductType }
  | { type: "edit_cart", payload: CartItem }
  | { type: "sort_products_ascending" }
  | { type: "sort_products_descending" }
  | { type: "default_sort" }
  | { type: "remove_from_cart", payload: CartItem }
  | { type: "clear_cart" }
  | { type: "clear_error" }

const reducer = (state: InitialStateType, action: ActionType): InitialStateType => {
  switch (action.type) {
    case "set_products": {
      const _products = action.payload;
      return { ...state, products: _products, sortedProducts: _products }
    }
    case "set_error": {
      const _error = action.payload;
      return { ...state, error: _error }
    }
    case "set_cart": {
      const _products = action.payload.map(cart => {
        return cart.products.map(product => {
          return { id: product.productId, quantity: product.quantity }
        });
      }).flat();
      return { ...state, cart: _products };
    }
    case "add_receipt": {
      const _receipts = [...state.receipts, action.payload];
      return { ...state, receipts: _receipts };
    }
    case "add_product": {
      const _products = [...state.products, action.payload];
      return { ...state, products: _products, sortedProducts: _products }
    }
    case "add_to_cart": {
      const _products = [...state.cart, action.payload];
      return { ...state, cart: _products }
    }
    case "edit_product": {
      const _products = state.products.map(product => {
        if (product.id === action.payload.id) {
          return action.payload;
        }
        return product;
      });
      return { ...state, products: _products, sortedProducts: _products }
    }
    case "edit_cart": {
      const _products = state.cart.map(product => {
        if (product.id === action.payload.id) {
          return action.payload;
        }
        return product;
      });
      return { ...state, cart: _products }
    }
    case "remove_from_cart": {
      const _products = state.cart.filter(product => product.id !== action.payload.id);
      return { ...state, cart: _products }
    }
    case "clear_cart": {
      return { ...state, cart: [] }
    }
    case "clear_error": {
      return { ...state, error: "" }
    }
    case "sort_products_ascending": {
      const _products = state.sortedProducts.toSorted((a, b) => a.price - b.price);
      return { ...state, sortedProducts: _products }
    }
    case "sort_products_descending": {
      const _products = state.sortedProducts.toSorted((a, b) => b.price - a.price);
      return { ...state, sortedProducts: _products }
    }
    case "default_sort": {
      return { ...state, sortedProducts: [...state.products] }
    }
    default:
      return state;
  }
}


export const useProducts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${PRODUCTS_API}?limit=${ITEM_PER_PAGE}`);
      const products = await response.json();
      dispatch({ type: "set_products", payload: products });
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({ type: "set_error", payload: "Error fetching products" });
      }
    }
  }

  const fetchCart = async () => {
    try {
      const response = await fetch(`${CART_API}/user/${USER_ID}`);
      const products = await response.json();
      dispatch({ type: "set_cart", payload: products });
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({ type: "set_error", payload: "Error fetching products" });
      }
    }
  }

  const clearCart = () => {
    dispatch({ type: "clear_cart" });
    return true;
  }

  const updateProduct = (product: ProductType) => {
    dispatch({ type: "edit_product", payload: product });
  }

  const createProduct = async (product: ProductType) => {
    dispatch({ type: "add_product", payload: product });
  }

  const addProductToCart = (product: ProductType) => {
    const cartItem = state.cart.find(item => item.id === product.id);
    if (cartItem) {
      const updatedItem = { ...cartItem, quantity: cartItem.quantity + 1 };
      dispatch({ type: "remove_from_cart", payload: cartItem });
      dispatch({ type: "add_to_cart", payload: updatedItem });
    } else {
      const newCartItem = { id: product.id, quantity: 1 };
      dispatch({ type: "add_to_cart", payload: newCartItem });
    }
    return true;
  }

  const addReceipt = (receipt: ReceiptType) => {
    dispatch({ type: "add_receipt", payload: receipt });
  };

  const getProductsFromCart = (): Array<ProductType & { quantity: number }> => {
    const _products: Array<ProductType & { quantity: number }> = [];
    state.cart.forEach(cartProduct => {
      const _product = state.products.find(p => p.id === cartProduct.id);
      if (_product) {
        _products.push({ ..._product, quantity: cartProduct.quantity });
      }
    });
    return _products;
  }

  const getProductById = (id: number) => {
    return state.products.find(product => product.id === id);
  }

  const removeProductFromCart = (product: ProductType) => {
    const cartItem = state.cart.find(item => item.id === product.id);
    if (cartItem) {
      const updatedItem = { ...cartItem, quantity: cartItem.quantity - 1 };
      dispatch({ type: "remove_from_cart", payload: cartItem });
      if (updatedItem.quantity > 0) {
        dispatch({ type: "add_to_cart", payload: updatedItem });
        return true;
      }
      return true;
    }
    return false;
  }

  const getReceipt = (id: number) => {
    return state.receipts.find(receipt => receipt.id === id);
  }

  const sortByPriceAscending = () => {
    dispatch({ type: "sort_products_ascending" });
  }

  const sortByPriceDescending = () => {
    dispatch({ type: "sort_products_descending" });
  }

  const sortDefault = () => {
    dispatch({ type: "default_sort" });
  }

  const totalCartProducts = useMemo(() => state.cart.reduce((acc, product) => acc + product.quantity, 0), [state.cart.reduce((acc, product) => acc + product.quantity, 0)]);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return {
    ...state,
    totalCartProducts,
    clearCart,
    addProductToCart,
    addReceipt,
    getProductsFromCart,
    removeProductFromCart,
    getProductById,
    updateProduct,
    sortByPriceAscending,
    sortByPriceDescending,
    createProduct,
    sortDefault,
    getReceipt
  };
}
