import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';

import { Label } from 'src/components/label';

import type { Project } from 'src/types';

// ----------------------------------------------------------------------

type ProjectsListProps = {
  projects: Project[];
  loading?: boolean;
};

export function ProjectsList({ projects, loading }: ProjectsListProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: Project['status']) => {
    const colors: Record<Project['status'], 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
      planning: 'info',
      active: 'success',
      'on-hold': 'warning',
      completed: 'default',
      archived: 'default',
    };
    return colors[status] || 'default';
  };

  if (loading) {
    return (
      <Box>
        {[1, 2, 3].map((i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Skeleton variant="rectangular" height={120} />
          </Box>
        ))}
      </Box>
    );
  }

  if (projects.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          No projects found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {projects.map((project) => (
        <Card key={project.id} sx={{ mb: 2 }}>
          <CardActionArea onClick={() => navigate(`/projects/${project.id}`)}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                <Typography variant="h6">{project.name}</Typography>
                <Chip label={project.status} color={getStatusColor(project.status)} size="small" />
              </Box>
              {project.description && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {project.description}
                </Typography>
              )}
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Label color={project.priority === 'urgent' ? 'error' : project.priority === 'high' ? 'warning' : 'info'}>
                  {project.priority}
                </Label>
                <Typography variant="caption" color="text.secondary">
                  {project.members.length} members
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

