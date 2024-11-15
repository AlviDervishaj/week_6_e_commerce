import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
export const Checkout = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper', marginX: "auto" }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center", paddingTop: 1 }}>Checkout</Typography>
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center", paddingTop: 1 }}>Your order is on the way! </Typography>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center", paddingTop: 1 }}>In the meantime, take a look at the Receipt.</Typography>
    </Box>
  )
}
