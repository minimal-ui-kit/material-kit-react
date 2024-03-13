export type EtsyApiResponse<T = string> = {
  count: number;
  results: Array<T>;
};

type Status =
  | 'paid'
  | 'completed'
  | 'open'
  | 'payment processing'
  | 'canceled'
  | 'fully refunded'
  | 'partially refunded';

type CapitalizeFirstLetter<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Lowercase<Rest>}`
  : S;

type CapitalizeWords<S extends string> = S extends `${infer Word} ${infer Rest}`
  ? `${CapitalizeFirstLetter<Word>} ${CapitalizeWords<Rest>}`
  : CapitalizeFirstLetter<S>;

type CapitalizedStatus = CapitalizeWords<Status>;

export type PriceDetails = Partial<{
  amount: number;
  divisor: number;
  currency_code: string;
  currency_formatted_short: string;
  currency_formatted_long: string;
  is_discounted: boolean;
  discount_formatted_short: string;
  discount_formatted_long: string;
}>;

export type ShopReceipt = {
  receipt_id: number;
  receipt_type: number;
  seller_user_id: number;
  seller_email?: string | null;
  buyer_user_id: number;
  buyer_email?: string | null;
  name: string;
  first_line: string;
  second_line?: string | null;
  city: string;
  state?: string | null;
  zip: string;
  status: CapitalizedStatus | Status | Uppercase<Status>;
  formatted_address: string;
  country_iso: string;
  payment_method:
    | 'cc'
    | 'paypal'
    | 'check'
    | 'mo'
    | 'bt'
    | 'other'
    | 'ideal'
    | 'sofort'
    | 'apple_pay'
    | 'google'
    | 'android_pay'
    | 'google_pay'
    | 'klarna'
    | 'k_pay_in_4'
    | 'k_pay_in_3'
    | 'k_financing';
  payment_email?: string | null;
  message_from_seller?: string | null;
  message_from_buyer?: string | null;
  message_from_payment?: string | null;
  is_paid: boolean;
  is_shipped: boolean;
  create_timestamp: number;
  created_timestamp: number;
  update_timestamp: number;
  updated_timestamp: number;
  is_gift: boolean;
  gift_message: string;
  gift_sender: string;
  grandtotal: PriceDetails;
  subtotal: PriceDetails;
  total_price: PriceDetails;
  total_shipping_cost: PriceDetails;
  total_tax_cost: PriceDetails;
  total_vat_cost: PriceDetails;
  discount_amt: PriceDetails;
  gift_wrap_price: PriceDetails;
  shipments: Array<object>;
  transactions: Array<object>;
  refunds: Array<object>;
};
