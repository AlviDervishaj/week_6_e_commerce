import { createBrowserRouter } from "react-router-dom";
import { Layout, Home, Cart, Product, Checkout, Receipts, Receipt } from "./lazy";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/receipts",
        element: <Receipts />,
      },
      {
        path: "/receipt/:id",
        element: <Receipt />
      },
      {
        path: "/create",
        element: <Product />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      }
    ],
  },
  {
    path: "*",
    element: <Layout />,
  }
]);
