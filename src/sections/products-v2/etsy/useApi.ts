import { useEffect, useState } from 'react';

import { fetchShopListingMock } from './etsy-api';
import { EtsyApiResponse, ShopReceipt } from './etsy-api.types';
import { createFinanceSheet, FinanceSheet, Shop } from './etsy-utils.ts';

export function useApiShopReceipts(
  apiUrl = process.env.API_URL || 'http://localhost:3003', // Default URL if environment variable not set
) {
  const [data, setData] = useState<FinanceSheet>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const getMe: { shop_id: number; user_id: number } = await fetch(
          `${apiUrl}/users/me`,
        ).then((res) => res.json());

        const response = await fetch(`${apiUrl}/shops/${getMe.shop_id}/receipts`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json: EtsyApiResponse<ShopReceipt> = await response.json();
        console.log(json);
        const results: ShopReceipt[] = json?.results ? json?.results : [];
        const financeSheet = createFinanceSheet(results);
        setData(financeSheet);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, [apiUrl]);

  return { data, loading, error };
}

export function useApiShop(
  apiUrl = process.env.API_URL || 'http://localhost:3003', // Default URL if environment variable not set
) {
  const [shop, setShop] = useState<Shop>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const getMe: { shop_id: number; user_id: number } = await fetch(
          `${apiUrl}/users/me`,
        ).then((res) => res.json());
        const shopId = getMe.shop_id;

        const response = await fetch(`${apiUrl}/shop/${shopId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const shopp: Shop = await response.json();
        setShop(shopp);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, [apiUrl]);

  return { shop, loading, error };
}

export function getShopLoginLink(
  apiUrl = process.env.API_URL || 'http://localhost:3003', // Default URL if environment variable not set
) {
  const [link, setLink] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${apiUrl}/genLink`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result: string = await response.text();
        console.log(result);
        setLink(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, [apiUrl]);

  return { link, loading, error };
}

export function useApiShopReceiptsMock() {
  const [data, setData] = useState<FinanceSheet>([]);
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
