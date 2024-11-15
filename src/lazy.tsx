import { CircularProgress } from '@mui/material';
import { lazy, Suspense } from 'react';
import Box from '@mui/material/Box/Box';
const LazyHome = lazy(() => import('./pages/Home'));
const LazyCart = lazy(() => import('./pages/Cart'));
const LazyLayout = lazy(() => import('./components/Layout').then(module => ({ default: module.Layout })));
const LazyProduct = lazy(() => import('./pages/Product').then(module => ({ default: module.Product })));
const LazyCheckout = lazy(() => import('./pages/Checkout').then(module => ({ default: module.Checkout })));
const LazyReceipts = lazy(() => import('./pages/Receipts').then(module => ({ default: module.Receipts })));
const LazyReceipt = lazy(() => import('./pages/Receipt').then(module => ({ default: module.Receipt })));

export const Home = () => {
  return (
    <Suspense fallback={
      <Box>
        <CircularProgress size={25} color={"primary"} />
      </Box>
    }
    >
      <LazyHome />
    </Suspense>
  )
}

export const Layout = () => {
  return (
    <Suspense fallback={
      <Box>
        <CircularProgress size={25} color={"primary"} />
      </Box>
    }
    >
      <LazyLayout />
    </Suspense>
  )
}

export const Cart = () => {
  return (
    <Suspense fallback={
      <Box>
        <CircularProgress size={25} color={"primary"} />
      </Box>
    }
    >
      <LazyCart />
    </Suspense>
  )
}
export const Product = () => {
  return (
    <Suspense fallback={
      <Box>
        <CircularProgress size={25} color={"primary"} />
      </Box>
    }
    >
      <LazyProduct />
    </Suspense>
  )
};

export const Checkout = () => {
  return (
    <Suspense fallback={
      <Box>
        <CircularProgress size={25} color={"primary"} />
      </Box>
    }
    >
      <LazyCheckout />
    </Suspense>
  )
}
export const Receipts = () => {
  return (
    <Suspense fallback={
      <Box>
        <CircularProgress size={25} color={"primary"} />
      </Box>
    }
    >
      <LazyReceipts />
    </Suspense>
  )
}

export const Receipt = () => {
  return (
    <Suspense fallback={
      <Box>
        <CircularProgress size={25} color={"primary"} />
      </Box>
    }
    >
      <LazyReceipt />
    </Suspense>
  )
}
