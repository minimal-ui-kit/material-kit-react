export type EtsyApiResponse<T = string> = {
  count: number;
  results: Array<T>;
};

export const statusValues = [
  'paid',
  'completed',
  'open',
  'payment processing',
  'canceled',
  'fully refunded',
  'partially refunded',
] as const;

export type Status = (typeof statusValues)[number];

type CapitalizeFirstLetter<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Lowercase<Rest>}`
  : S;

type CapitalizeWords<S extends string> = S extends `${infer Word} ${infer Rest}`
  ? `${CapitalizeFirstLetter<Word>} ${CapitalizeWords<Rest>}`
  : CapitalizeFirstLetter<S>;

type CapitalizedStatus = CapitalizeWords<Status>;

export type PriceDetailsGeneral = Partial<PriceDetails> &
  Partial<{
    currency_formatted_short: string;
    currency_formatted_long: string;
    is_discounted: boolean;
    discount_formatted_short: string;
    discount_formatted_long: string;
  }>;

export type PriceDetails = {
  amount: number;
  divisor: number;
  currency_code: string;
};

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
  grandtotal: PriceDetailsGeneral;
  subtotal: PriceDetailsGeneral;
  total_price: PriceDetailsGeneral;
  total_shipping_cost: PriceDetailsGeneral;
  total_tax_cost: PriceDetailsGeneral;
  total_vat_cost: PriceDetailsGeneral;
  discount_amt: PriceDetailsGeneral;
  gift_wrap_price: PriceDetailsGeneral;
  shipments: Array<object>;
  transactions: Array<object>;
  refunds: Array<Transaction>;
};

export type Transaction = {
  transaction_id: number; // The unique numeric ID for a transaction.
  title?: string | null; // The title string of the listing purchased in this transaction.
  description?: string | null; // The description string of the listing purchased in this transaction.
  seller_user_id: number; // The numeric user ID for the seller in this transaction.
  buyer_user_id: number; // The numeric user ID for the buyer in this transaction.
  create_timestamp: number; // The transaction's creation date and time, in epoch seconds.
  created_timestamp: number; // The transaction's creation date and time, in epoch seconds.
  paid_timestamp?: number | null; // The transaction's paid date and time, in epoch seconds.
  shipped_timestamp?: number | null; // The transaction's shipping date and time, in epoch seconds.
  quantity: number; // The numeric quantity of products purchased in this transaction.
  listing_image_id?: number | null; // The numeric ID of the primary listing image for this transaction.
  receipt_id: number; // The numeric ID for the receipt associated to this transaction.
  is_digital: boolean; // When true, the transaction recorded the purchase of a digital listing.
  file_data: string; // A string describing the files purchased in this transaction.
  listing_id?: number | null; // The numeric ID for the listing associated to this transaction.
  transaction_type: string; // The type string for the transaction, usually "listing".
  product_id?: number | null; // The numeric ID for a specific product purchased from a listing.
  sku?: string | null; // The SKU string for the product
  price: PriceDetails;
  shipping_cost: PriceDetails;
  variations: Variation[]; // Array of variations and personalizations the buyer chose.
  product_data: ProductData[]; // A list of property value entries for this product. Note: parenthesis characters (( and )) are not allowed.
  shipping_profile_id?: number | null; // The ID of the shipping profile selected for this listing.
  min_processing_days?: number | null; // The minimum number of days for processing the listing.
  max_processing_days?: number | null; // The maximum number of days for processing the listing.
  shipping_method?: string | null; // Name of the selected shipping method.
  shipping_upgrade?: string | null; // The name of the shipping upgrade selected for this listing. Default value is null.
  expected_ship_date?: number | null; // The date & time of the expected ship date, in epoch seconds.
  buyer_coupon: number; // The amount of the buyer coupon that was discounted in the shop's currency. Default: 0
  shop_coupon: number; // The amount of the shop coupon that was discounted in the shop's currency. Default: 0
};

export type Variation = {
  property_id: number;
  value_id?: number | null;
  formatted_name: string;
  formatted_value: string;
};

export type ProductData = {
  property_id: number;
  property_name: string;
  scale_id?: number | null;
  scale_name?: string | null;
  value_ids: number[];
  values: string[];
};
