import { useContext, useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { ProductsContext } from "../providers/ProductsContext";

import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem/ListItem';
import ListItemButton from '@mui/material/ListItemButton/ListItemButton';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import Typography from "@mui/material/Typography/Typography";
import { ProductType, ReceiptType } from "../types/product";

export const Receipt = () => {
  const { getReceipt, getProductById } = useContext(ProductsContext);
  const [receipt, setReceipt] = useState<ReceiptType | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    if (id && !isNaN(parseInt(id))) {
      const _receipt = getReceipt(parseInt(id));
      setReceipt(_receipt);
    }
  }, []);

  if(!receipt) {
    return <Typography variant="h5" sx={{ textAlign: "center", paddingY: 1, color: "danger" }}>No receipt found</Typography>
  }

  return (
    <>
    <Typography variant="h5" sx={{ textAlign: "center", paddingY: 1 }}>Receipt #{receipt.id}</Typography>
    <List>
      {receipt.products.map((_prod) => {
        const product = getProductById(_prod.productId) as ProductType;
        return (
        <ListItem key={product.title} disablePadding>
          <ListItemButton>
            <ListItemText primary={`${product.title}`} secondary={
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'secondary.main', fontWeight: 500, fontSize: 17, display: 'inline' }}
              >
                X {_prod.quantity} &ndash; {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
              </Typography>
            } />
          </ListItemButton>
        </ListItem>
      )
      }
    )}
    </List>
    </>
  )
}
