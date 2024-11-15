import { ProductType, ReceiptType } from "../../types/product"
import Typography from '@mui/material/Typography/Typography';
import Grid from "@mui/material/Grid2/Grid2";
import { CartProduct } from "./CartProduct";
import Button from "@mui/material/Button/Button";
import Box from "@mui/material/Box/Box";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { ProductsContext } from "../../providers/ProductsContext";

type CartProductsProps = {
  products: Array<ProductType & { quantity: number }>
}


export const CartProducts = ({ products }: CartProductsProps) => {
  const { addReceipt, clearCart } = useContext(ProductsContext);
  const navigate = useNavigate();
  if (products.length === 0) {
    return (
      <Typography variant="h3" sx={{ textAlign: "center", paddingTop: 1 }}>
        Your cart is empty
      </Typography>
    )
  }

  const handleProceedToCheckout = () => {
    const cart: ReceiptType = {
      id: Math.floor(Math.random() * 9999),
      products: products.map(product => ({ productId: product.id, quantity: product.quantity })),
      date: new Date().toISOString(),
    }
    addReceipt(cart);
    clearCart();
    navigate("/checkout");
  }
  return (
    <>
      <Typography color={"secondary.main"} variant="h3" sx={{ textAlign: "center", paddingTop: 1 }}>
        Cart Review
      </Typography>
      <Box display="flex" alignContent="center" justifyContent="flex-end" sx={{ width: 0.8, marginX: "auto" }}>
        <Button color={"success"} variant="outlined" onClick={() => handleProceedToCheckout()}>Proceed to Checkout</Button>
      </Box>

      <Grid container spacing={2} sx={{ padding: 3 }}>
        {products.map(product => <CartProduct product={product} key={product.id} />)}
      </Grid>
    </>
  )
}

