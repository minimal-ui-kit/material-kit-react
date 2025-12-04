import { lazy } from 'react';

const ProjectsView = lazy(() => import('src/sections/project/view/projects-view'));

// ----------------------------------------------------------------------

export default function ProjectsPage() {
  return <ProjectsView />;
}

