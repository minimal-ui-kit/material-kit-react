import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';

import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

import type { Project } from 'src/types';

// ----------------------------------------------------------------------

type TeamProjectsProps = {
  teamId: string;
};

export function TeamProjects({ teamId }: TeamProjectsProps) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadProjects();
  }, [teamId]);

  const loadProjects = async () => {
    // TODO: Replace with actual API call
    // const response = await api.getProjects(teamId);
    // setProjects(response.projects);
    
    // Demo data
    setProjects([
      {
        id: '1',
        name: 'Website Redesign',
        description: 'Complete redesign of company website',
        teamId,
        status: 'active',
        priority: 'high',
        members: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
  };

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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Projects</Typography>
        <Button variant="contained" startIcon={<Iconify icon="mingcute:add-line" />}>
          Create Project
        </Button>
      </Box>

      {projects.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No projects yet. Create your first project!
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {projects.map((project) => (
            <Card key={project.id}>
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
      )}
    </Box>
  );
}

