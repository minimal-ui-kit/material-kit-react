import { useEffect, useState } from 'react';

import { fetchShopListingMock } from './etsy-api';
import { createFinanceSheet, FinanceSheet } from './etsy-utils.ts';

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
  const [data, setData] = useState<FinanceSheet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchDataMock() {
      try {
        const response = await fetchShopListingMock();
        const results = response?.results ? response?.results : [];
        const financeSheet = createFinanceSheet(results);
        setData(financeSheet);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchDataMock();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  return { data, loading };
}
