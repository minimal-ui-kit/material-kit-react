import { lazy } from 'react';

const TeamsView = lazy(() => import('src/sections/team/view/teams-view'));

// ----------------------------------------------------------------------

export default function TeamsPage() {
  return <TeamsView />;
}

