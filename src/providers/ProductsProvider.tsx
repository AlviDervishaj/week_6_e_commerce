import { ReactNode } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductsContext } from "./ProductsContext";
import Typography from "@mui/material/Typography/Typography";

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const values = useProducts();
  return (
    <ProductsContext.Provider value={{
      ...values,
      totalCartPrice: 0,
    }}>
      {values.error ? <Typography variant="h5" sx={{ textAlign: "center", paddingY: 1, color: "danger" }}>{values.error}</Typography> : children}
    </ProductsContext.Provider>
  )
}
