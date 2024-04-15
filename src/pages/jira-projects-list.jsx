import { Helmet } from 'react-helmet-async';

import { JiraProjectsPage } from '../sections/jira-projects/view';
// ----------------------------------------------------------------------

export default function FilesPage() {
  // const { fetchUser } = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title> JIRA Projects </title>
      </Helmet>

      <JiraProjectsPage />
    </>
  );
}
