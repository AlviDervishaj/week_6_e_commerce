import { useContext } from "react"
import { ProductsContext } from "../providers/ProductsContext";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem/ListItem';
import ListItemButton from '@mui/material/ListItemButton/ListItemButton';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import { useNavigate } from "react-router";

export const Receipts = () => {
  const { receipts } = useContext(ProductsContext);
  const navigate = useNavigate();


  // Render the id of each receipt and the total quantity of products in each receipt
  return (
    <Box sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper', marginX: "auto" }}>

      <List sx={{ width: 1, padding: 1, marginX: "auto" }}>
        {receipts.length > 0 ? receipts.map((receipt) => (
          <ListItem onClick={() => navigate(`/receipt/${receipt.id}`)} key={receipt.id} disablePadding sx={{marginY: 1}}>
            <ListItemButton>

              <ListItemText primary={`Receipt ID: #${Math.floor(receipt.id)}`} secondary={
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'secondary.main', fontWeight: 500, fontSize: 17, display: 'inline' }}
                >
                  {new Date(receipt.date).toLocaleDateString()}
                </Typography>
              } />

              <Typography variant="h6" gutterBottom sx={{ textAlign: "center", paddingTop: 1 }}>Total Quantity: {receipt.products.reduce((acc, product) => acc + product.quantity, 0)}</Typography>

            </ListItemButton>
          </ListItem>
        )) : <Typography variant="h5" sx={{ textAlign: "center", paddingY: 1 }}>No receipts found</Typography>}
      </List>
    </Box>
  )

}
