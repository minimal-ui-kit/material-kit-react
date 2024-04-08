export interface CurrencyFormatterProps {
  value: number;
  locale?: string;
  currency?: string;
}

const CurrencyFormatter = ({
  value,
  locale = 'en-US',
  currency = 'USD',
}: CurrencyFormatterProps) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

export default CurrencyFormatter;
