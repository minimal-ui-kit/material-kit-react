import { EtsyApiResponse, ShopReceipt } from './etsy-api.types';
import { MOCK_SHOP_RECEIPTS } from './mock_shop_receipts';

async function fetchShopListingMock(): Promise<EtsyApiResponse<ShopReceipt>> {
  return new Promise((resolve) => {
    resolve(MOCK_SHOP_RECEIPTS);
  });
}

export { fetchShopListingMock };
