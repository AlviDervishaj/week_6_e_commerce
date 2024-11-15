import { useContext } from "react";
import Box from '@mui/material/Box/Box';
import Paper from '@mui/material/Paper/Paper';
import Delete from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import Grid from "@mui/material/Grid2/Grid2";
import Typography from "@mui/material/Typography/Typography";
import { Item } from "../ui/Item";
import { FeedbackButton } from "../FeebackButton";
import { ProductsContext } from "../../providers/ProductsContext";
import { ProductType } from "../../types/product";

type CartProductProps = {
  product: ProductType & { quantity: number }
}
export const CartProduct = ({ product }: CartProductProps) => {
  const { removeProductFromCart } = useContext(ProductsContext);
  return (
    <Grid size={3}>
      <Paper
        variant="elevation"
        sx={{ paddingX: 2, paddingY: 1, minHeight: 353 }}
      >
        <Item
          sx={{
            paddingY: 1,
            height: 1,
            width: 1,
            shadow: 2,
            justifyContent: "space-between",
            alignItems: "center",
          }}
          useFlexGap
          direction="column"
          spacing={2}
        >
          <Box
            sx={{ width: 1, height: "auto", marginX: "auto", paddingBottom: 10 }}
          >
            <img src={product.image} alt={product.title} width={250} height={250} style={{ aspectRatio: "square", objectFit: "contain" }} />
          </Box>
          <Box sx={{ overflow: "hidden", textOverflow: "ellipsis", width: 1 }}>
            <Tooltip title={product.title}>
              <Typography
                variant="h6"
                noWrap
                sx={{ alignSelf: "flex-start", textAlign: "left" }}
              >
                {product.title}
              </Typography>
            </Tooltip>
          </Box>
          <Typography
            variant="h5"
            sx={{ width: 1, textAlign: "left", color: "secondary.main", display: "flex", justifyContent: "space-between" }}
          >
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
              product.price * product.quantity,
            )} ({product.quantity} * {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)})
            <FeedbackButton
              buttonProps={{
                startIcon: <Delete />,
                variant: "contained",
                color: "error",
              }}
              handleOnClick={() => removeProductFromCart(product)}
              text={"Product removed from cart!"}
              errorText={"Could not remove product from cart !"}
              buttonText={"Remove"}
            />
          </Typography>
        </Item>
      </Paper >
    </Grid>
  )
}
