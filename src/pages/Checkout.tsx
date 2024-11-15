import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Typography from '@mui/material/Typography/Typography';
import { useNavigate } from 'react-router';
export const Checkout = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper', marginX: "auto" }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center", paddingTop: 1 }}>Checkout</Typography>
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center", paddingTop: 1 }}>Your order is on the way! </Typography>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center", paddingTop: 1, display: "flex", alignItems:"center" }}>In the meantime, take a look at the
        <Button variant={"outlined"} sx={{marginLeft: 1}} color="info" onClick={() => navigate("/receipts")}> Receipt</Button>
      </Typography>
    </Box>
  )
}
