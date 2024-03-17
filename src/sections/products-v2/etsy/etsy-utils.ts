import { ShopReceipt } from './etsy-api.types.ts';

export const createFinanceSheet = (data: ShopReceipt[]): FinanceSheet => {
  return data.map((item) => {
    const nameSplit = item.name ? item.name.split(' ') : null;
    const productQuantity =
      item?.transactions.length > 0
        ? item.transactions.reduce(
            (acc, curr) => acc + (curr as { quantity: number })?.quantity,
            0,
          )
        : null;

    const formatDate = (timestamp: number) => {
      const date = new Date(timestamp);
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    };

    return {
      firstName: nameSplit ? nameSplit[0] : '',
      middleName: nameSplit ? (nameSplit.length > 2 ? nameSplit[1] : '') : '',
      lastName: nameSplit ? (nameSplit.length > 2 ? nameSplit[2] : nameSplit[1]) : '',
      orderDate: formatDate(item.created_timestamp),
      itemPrice: item?.total_price?.amount ? item.total_price.amount / 100 : null,
      discount: item?.discount_amt?.amount ? item.discount_amt.amount / 100 : null,
      subTotal: item?.subtotal?.amount ? item.subtotal.amount / 100 : null,
      totalShippingCost: item?.total_shipping_cost?.amount
        ? item.total_shipping_cost.amount / 100
        : null,
      tax: item?.total_tax_cost?.amount ? item.total_tax_cost.amount / 100 : null,
      total: item?.grandtotal?.amount ? item.grandtotal.amount / 100 : null,
      transactionFees: item?.subtotal?.amount ? item.subtotal.amount * 0.00065 : null,
      tfVAT: item?.subtotal?.amount ? item.subtotal.amount * 0.00065 * 0.2 : null,
      processingFees: item?.grandtotal?.amount
        ? item.grandtotal.amount * 0.0004 + 0.3
        : null,
      pfVAT: item?.grandtotal?.amount ? item.grandtotal.amount * 0.00008 + 0.06 : null,
      listingFee: productQuantity ? productQuantity * 0.18 : null,
      lfVAT: productQuantity ? productQuantity * 0.04 : null,
      shippingFee: item?.total_shipping_cost?.amount
        ? item.total_shipping_cost.amount + 0.00065
        : null,
      sfVAT: item?.total_shipping_cost?.amount
        ? item.total_shipping_cost.amount * 0.00065 * 0.2
        : null,
      shopReceipt: item,
    };
  });
};

export type FinanceSheet = Partial<{
  firstName: string;
  middleName: string;
  lastName: string;
  orderDate: string;
  itemPrice: number | null;
  discount: number | null;
  subTotal: number | null;
  totalShippingCost: number | null;
  tax: number | null;
  total: number | null;
  transactionFees: number | null;
  tfVAT: number | null;
  processingFees: number | null;
  pfVAT: number | null;
  listingFee: number | null;
  lfVAT: number | null;
  shippingFee: number | null;
  sfVAT: number | null;
  shopReceipt: ShopReceipt;
}>[];
