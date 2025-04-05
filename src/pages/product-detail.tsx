import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { CONFIG } from 'src/config-global';

import { ProductDetailPage } from 'src/sections/product/view/product-detail-page';
// ----------------------------------------------------------------------

export default function Page() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    if (!productId) return;

    fetch(`http://localhost:3000/api/activities/${productId}`
      , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
        
  }, [productId]);

  if (!productId) {
    return <div>Invalid product ID</div>;
  }

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <>
      <Helmet>
        <title> {`Products - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProductDetailPage product={product}/>
    </>
  );
}
