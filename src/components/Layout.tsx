import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { themeOptions } from '../utils/theme';
import Box from '@mui/material/Box/Box';


import { Outlet } from "react-router"
import { Navigation } from './Navigation';
import { ProductsProvider } from '../providers/ProductsProvider';

export const Layout = () => {
  return (
    <ThemeProvider theme={createTheme(themeOptions)}>
      <CssBaseline enableColorScheme />
      <ProductsProvider>
        <Navigation />
        <Box sx={{ paddingTop: 9 }}>
          <Outlet />
        </Box>
      </ProductsProvider>
    </ThemeProvider>
  )
}
