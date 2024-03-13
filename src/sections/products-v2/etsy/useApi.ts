import { useState, useEffect } from 'react';
import { EtsyApiResponse, ShopReceipt } from './etsy-api.types';
import { fetchShopListingMock } from './etsy-api';

// function useApi(url: string) {
//   const [data, setData] = useState<EtsyApiResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const json: EtsyApiResponse = await response.json();
//         setData(json);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     }
//
//     fetchData();
//
//     return () => {
//       // Cleanup function if needed
//     };
//   }, [url]);
//
//   return { data, loading, error };
// }

export function useApiShopReceipts() {
  const [data, setData] = useState<EtsyApiResponse<ShopReceipt> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchDataMock() {
      try {
        const response = await fetchShopListingMock();
        setData(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchDataMock();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  return { data, loading, error };
}
