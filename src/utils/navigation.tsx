import { NavigationItem } from "../types/navigation";
import Home from "@mui/icons-material/Home";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Add from "@mui/icons-material/Add";
import Receipt from "@mui/icons-material/Receipt";

export const title: string = 'Shopalvery';
export const navItems: NavigationItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <Home />
  },
  {
    title: "New Product",
    href: "/create",
    icon: <Add />
  },
  {
    title: "Receipts",
    href: "/receipts",
    icon: <Receipt />
  },

  {
    title: "Cart",
    href: "/cart",
    icon: <ShoppingCart />
  }
];
