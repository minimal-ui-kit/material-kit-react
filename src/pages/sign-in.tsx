import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { SignInView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function SignInPage() {
  const { t } = useTranslation('auth');

  return (
    <>
      <Helmet>
        <title>{t('signIn.helmet')}</title>
      </Helmet>

      <SignInView />
    </>
  );
}
