import { useContext, useEffect, useState } from "react";
import { CartProducts } from "../components/cart/CartProducts";
import { ProductsContext } from "../providers/ProductsContext";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

export default function CartPage() {
  const { getProductsFromCart } = useContext(ProductsContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ReturnType<typeof getProductsFromCart>>([]);

  useEffect(() => {
    setIsLoading(true);
    const _products = getProductsFromCart();
    setProducts(_products);
    setIsLoading(false);
  }, [getProductsFromCart]);

  if (isLoading) {
    return <CircularProgress size={50} color={"primary"} />
  }

  return (
    <CartProducts products={products} />
  )
}
