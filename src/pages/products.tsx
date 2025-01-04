import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { ProductsView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const { t } = useTranslation('products');

  return (
    <>
      <Helmet>
        <title>{t('list.helmet')}</title>
      </Helmet>

      <ProductsView />
    </>
  );
}
