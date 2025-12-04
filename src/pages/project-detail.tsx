import { lazy } from 'react';

const ProjectDetailView = lazy(() => import('src/sections/project/view/project-detail-view'));

// ----------------------------------------------------------------------

export default function ProjectDetailPage() {
  return <ProjectDetailView />;
}

