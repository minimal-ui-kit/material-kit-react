import { ShopReceipt } from './etsy-api.types.ts';

export const createFinanceSheet = (data: ShopReceipt[]): FinanceSheet => {
  return data.map((item, index) => {
    const nameSplit = item.name ? item.name.split(' ') : null;
    const productQuantity =
      item?.transactions.length > 0
        ? item.transactions.reduce(
            (acc, curr) => acc + (curr as { quantity: number })?.quantity,
            0,
          )
        : null;

    const formatDate = (timestampInSeconds: number) => {
      const timestampInMilliseconds = timestampInSeconds * 1000;
      const date = new Date(timestampInMilliseconds);
      return date.toLocaleDateString();
    };

    const financeSheet = {
      firstName: nameSplit ? nameSplit[0] : '',
      middleName: nameSplit ? (nameSplit.length > 2 ? nameSplit[1] : '') : '',
      lastName: nameSplit ? (nameSplit.length > 2 ? nameSplit[2] : nameSplit[1]) : '',
      orderDate: formatDate(item.created_timestamp),
      itemPrice: item?.total_price?.amount ? item.total_price.amount / 100 : 0,
      discount: item?.discount_amt?.amount ? item.discount_amt.amount / 100 : 0,
      subTotal: item?.subtotal?.amount ? item.subtotal.amount / 100 : 0,
      totalShippingCost: item?.total_shipping_cost?.amount
        ? item.total_shipping_cost.amount / 100
        : 0,
      tax: item?.total_tax_cost?.amount ? item.total_tax_cost.amount / 100 : 0,
      total: item?.grandtotal?.amount ? item.grandtotal.amount / 100 : 0,
      transactionFees: item?.subtotal?.amount ? item.subtotal.amount * 0.00065 : 0,
      tfVAT: item?.subtotal?.amount ? item.subtotal.amount * 0.00065 * 0.2 : 0,
      processingFees: item?.grandtotal?.amount
        ? item.grandtotal.amount * 0.0004 + 0.3
        : 0,
      pfVAT: item?.grandtotal?.amount ? item.grandtotal.amount * 0.00008 + 0.06 : 0,
      listingFee: productQuantity ? productQuantity * 0.18 : 0,
      lfVAT: productQuantity ? productQuantity * 0.04 : 0,
      shippingFee: item?.total_shipping_cost?.amount
        ? item.total_shipping_cost.amount * 0.00065
        : 0,
      sfVAT: item?.total_shipping_cost?.amount
        ? item.total_shipping_cost.amount * 0.00065 * 0.2
        : 0,
      shopReceipt: item,
      //TODO: find other solution
      avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    };

    const netProfit =
      financeSheet.subTotal +
      financeSheet.totalShippingCost -
      financeSheet.transactionFees -
      financeSheet.tfVAT -
      financeSheet.processingFees -
      financeSheet.pfVAT -
      financeSheet.listingFee -
      financeSheet.lfVAT -
      financeSheet.shippingFee -
      financeSheet.sfVAT;

    //TODO(Question): is it possible that the value is invalid or other than number?
    if (netProfit !== null) {
      financeSheet.netProfit = netProfit;
    }
    return financeSheet;
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
  avatarUrl: string;
  netProfit: number;
}>[];

export type Shop = {
  icon: string;
  name: string;
  url: string;
  shop_id: number;
};
