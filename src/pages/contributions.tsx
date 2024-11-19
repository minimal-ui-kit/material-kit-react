import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { ContributionsView } from 'src/sections/contributions/view';

function Contributions() {
  return (
    <>
      <Helmet>
        <title>{`Contributions - ${CONFIG.appName}`}</title>
      </Helmet>
      <ContributionsView noMultiSelect />
    </>
  );
}

export default Contributions;
