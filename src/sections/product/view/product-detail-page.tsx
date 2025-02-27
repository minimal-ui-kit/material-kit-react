import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------

export function ProductDetailPage() {
    const { productId } = useParams();
      
          const data = {
              name: 'Product Name',
              price: 100,
              status: 'sale',
              color: 'red',
              size: 'M',
              description: 'Product Description',
          };

    return (
        <div>
            <h1>{data.name}</h1>
            <p>{data.price}</p>
            <p>{data.status}</p>
            <p>{data.color}</p>
            <p>{data.size}</p>
            <p>{data.description}</p>
        </div>
    );
}