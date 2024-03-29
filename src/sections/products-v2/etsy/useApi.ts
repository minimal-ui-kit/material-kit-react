import { useEffect, useState } from 'react';

import { fetchShopListingMock } from './etsy-api';
import { EtsyApiResponse, ShopReceipt } from './etsy-api.types';
import { createFinanceSheet, FinanceSheet, Shop } from './etsy-utils.ts';

export type ShopWithUserId = Shop & { user_id?: number };

export function useApiShopReceipts(
  apiUrl = process.env.API_URL || 'http://localhost:3003', // Default URL if environment variable not set
) {
  const [data, setData] = useState<FinanceSheet>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const users: { shop_id: number; user_id: number }[] = await fetch(
          `${apiUrl}/users`,
        ).then((res) => res.json());

        if (!users || users.length === 0) {
          throw new Error('No users found');
        }

        const firstUser = users[1]; // Use the first user

        const response = await fetch(
          `${apiUrl}/users/${firstUser.user_id}/shops/${firstUser.shop_id}/receipts`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json: EtsyApiResponse<ShopReceipt> = await response.json();
        console.log('fetching data', json);
        const results: ShopReceipt[] = json?.results ? json?.results : [];
        const financeSheet = createFinanceSheet(results);
        console.log('fetching data', financeSheet);
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
  const [shops, setShops] = useState<ShopWithUserId[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const users: { shop_id: number; user_id: number }[] = await fetch(
          `${apiUrl}/users`,
        ).then((res) => res.json());

        if (!users || users.length === 0) {
          throw new Error('No users found');
        }

        const fetchedShops: ShopWithUserId[] = [];
        for (const user of users) {
          const response = await fetch(`${apiUrl}/shops/${user.shop_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const shop: ShopWithUserId = await response.json();
          shop.user_id = Number(user.user_id);
          fetchedShops.push(shop);
        }
        setShops(fetchedShops);
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

  const deleteShop = (userId: number) => {
    const newShops = shops.filter((shop) => {
      return shop.user_id !== userId;
    });
    setShops(newShops);
  };

  return { shops, loading, error, deleteShop };
}

export function getShopLoginLink(
  apiUrl = process.env.API_URL || 'http://localhost:3003', // Default URL if environment variable not set
) {
  const [error, setError] = useState<unknown | null>(null);

  const fetchShopLink = async function () {
    try {
      const response = await fetch(`${apiUrl}/genLink`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result: string = await response.text();
      console.log(result);
      return result;
    } catch (error) {
      setError(error);
    }
  };

  return { fetchShopLink, error };
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

export function useDeleteUserById(
  apiUrl = process.env.API_URL || 'http://localhost:3003',
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);

  const deleteUser = async (userId: number) => {
    setLoading(true);
    try {
      console.log('Deleting user', userId);
      const response = await fetch(`${apiUrl}/users/${userId}/delete`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { deleteUser, loading, error };
}
