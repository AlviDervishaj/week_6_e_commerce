import { ProductType } from '../../types/product';
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/material/Box/Box';
import Paper from '@mui/material/Paper/Paper';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import { Item } from "../ui/Item";
import { Tooltip } from '@mui/material';
import { useContext } from 'react';
import { ProductsContext } from '../../providers/ProductsContext';
import { FeedbackButton } from '../FeebackButton';
import { useNavigate } from 'react-router-dom';

export const Product = ({ product }: { product: ProductType }) => {
  const { addProductToCart } = useContext(ProductsContext);
  const navigate = useNavigate();
  return (
    <Paper
      variant="elevation"
      sx={{ paddingX: 2, paddingY: 1 }}
    >
      <Item
        sx={{
          paddingY: 1,
          height: 1,
          width: 350,
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
              sx={{ alignSelf: "flex-start", textAlign: "left", cursor: "pointer", ":hover": { color: "secondary.main" } }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {product.title}
            </Typography>
          </Tooltip>
        </Box>
        <Typography
          variant="h5"
          sx={{ width: 1, textAlign: "left", color: "secondary.main", position: "relative" }}
        >
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
            product.price,
          )}
          <FeedbackButton
            buttonProps={{
              startIcon: <AddShoppingCart />,
              sx: { position: "absolute", bottom: 1, right: 0 },
              variant: "contained",
              color: "secondary",
            }}
            handleOnClick={() => addProductToCart(product)}
            text={"Product added to cart"}
            errorText={"Error adding product to cart"}
            buttonText={"Add to Cart"}
          />
        </Typography>
      </Item>
    </Paper >
  )
}
