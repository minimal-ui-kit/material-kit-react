import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import ContributionsList from 'src/sections/contributions/view/contributions-list';

function Contributions() {
  return (
    <>
      <Helmet>
        <title>{`Contributions - ${CONFIG.appName}`}</title>
      </Helmet>
      <ContributionsList />
    </>
  );
}

export default Contributions;
