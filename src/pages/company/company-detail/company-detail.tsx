import { Helmet } from 'react-helmet-async';

import {CONFIG} from "../../../config-global";
import {
    CompanyDetail
} from "../../../sections/company/company-detail.";


export default function CompanyDetailPage() {
  return (
      <>
        <Helmet>
          <title> {`Şirket Detayı - ${CONFIG.appName}`}</title>
        </Helmet>

        <CompanyDetail />
      </>
  );
} 