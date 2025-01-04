import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { CONFIG } from 'src/config-global';

import { NotFoundView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslation('error');

  return (
    <>
      <Helmet>
        <title>{t('notFound.helmet', { appName: CONFIG.appName })}</title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
