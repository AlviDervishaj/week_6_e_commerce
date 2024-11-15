import { useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { ProductsContext } from '../providers/ProductsContext';
import { EditProduct } from '../components/product/EditProduct';

export const Product = () => {
  const { id } = useParams();
  const { getProductById } = useContext(ProductsContext);
  const [product, setProduct] = useState<ReturnType<typeof getProductById>>(undefined);


  useEffect(() => {
    if (id && !isNaN(parseInt(id))) {
      const _product = getProductById(parseInt(id));
      setProduct(_product);
    }
  }, [id, getProductById]);


  return (
    <>
      <EditProduct product={product} />
    </>
  )
}
