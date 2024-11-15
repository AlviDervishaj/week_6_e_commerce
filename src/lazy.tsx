import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { lazy, Suspense } from 'react';
import Box from '@mui/material/Box/Box';
const LazyHome = lazy(() => import('./pages/Home'));
const LazyCart = lazy(() => import('./pages/Cart'));
const LazyLayout = lazy(() => import('./components/Layout').then(module => ({ default: module.Layout })));
const LazyProduct = lazy(() => import('./pages/Product').then(module => ({ default: module.Product })));
const LazyCheckout = lazy(() => import('./pages/Checkout').then(module => ({ default: module.Checkout })));
const LazyReceipts = lazy(() => import('./pages/Receipts').then(module => ({ default: module.Receipts })));
const LazyReceipt = lazy(() => import('./pages/Receipt').then(module => ({ default: module.Receipt })));

const LoadingSpinner = () =>  <Box display="grid" sx={{width: 1, height: '90dvh', placeItems: "center"}}>
<CircularProgress />
</Box>

export const Home = () => {
  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <LazyHome />
    </Suspense>
  )
}

export const Layout = () => {
  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <LazyLayout />
    </Suspense>
  )
}

export const Cart = () => {
  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <LazyCart />
    </Suspense>
  )
}
export const Product = () => {
  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <LazyProduct />
    </Suspense>
  )
};

export const Checkout = () => {
  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <LazyCheckout />
    </Suspense>
  )
}
export const Receipts = () => {
  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <LazyReceipts />
    </Suspense>
  )
}

export const Receipt = () => {
  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <LazyReceipt />
    </Suspense>
  )
}
