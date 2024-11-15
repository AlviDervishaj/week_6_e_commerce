import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import Typography from '@mui/material/Typography/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import { navItems, title } from "../utils/navigation";
import { ProductsContext } from '../providers/ProductsContext';
import { useNavigate } from 'react-router';



export const Navigation = () => {
  const navigate = useNavigate();
  const { totalCartProducts } = useContext(ProductsContext);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar enableColorOnDark component="nav">
        <Toolbar sx={{ backgroundColor: "secondary.light" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {title}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button onClick={() => navigate(item.href)} startIcon={item.title === "Cart" ?
                <Badge color="info" badgeContent={totalCartProducts}>
                  {item.icon}
                </Badge>
                : item.icon}
                key={item.title}
                sx={{ color: '#fff', ":hover": { backgroundColor: "secondary.dark" }, marginLeft: 2 }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
