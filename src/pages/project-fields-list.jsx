import { Helmet } from 'react-helmet-async';

import { ProjectFieldsView } from '../sections/project-fields/view';

export default function ProjectFieldsListPage() {
  return (
    <>
      <Helmet>
        <title>Project Fields List</title>
      </Helmet>
      <ProjectFieldsView />
    </>
  );
}
