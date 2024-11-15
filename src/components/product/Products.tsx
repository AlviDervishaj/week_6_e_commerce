import { useContext } from 'react';
import Typography from '@mui/material/Typography/Typography';
import Stack from '@mui/material/Stack/Stack';
import Box from '@mui/material/Box/Box';
import { ProductsContext } from '../../providers/ProductsContext';
import { Product } from './Product';
import { Filters } from './Filters';

export const Products = () => {
  const { sortedProducts } = useContext(ProductsContext);
  return (
    <Box>
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center", paddingTop: 1 }}>Products</Typography>
      <Filters />
      <Stack
        useFlexGap
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ paddingBottom: 5, flexWrap: "wrap", justifyContent: "center", gap: 2 }}
        spacing={2}
      >
        {sortedProducts.map((product) => <Product key={product.id} product={product} />)}
      </Stack>
    </Box>
  )
}
