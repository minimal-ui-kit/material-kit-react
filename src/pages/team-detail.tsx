import { lazy } from 'react';

const TeamDetailView = lazy(() => import('src/sections/team/view/team-detail-view'));

// ----------------------------------------------------------------------

export default function TeamDetailPage() {
  return <TeamDetailView />;
}

