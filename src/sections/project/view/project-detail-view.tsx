import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';

import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

import { ProjectTasks } from '../project-tasks';
import { ProjectMembers } from '../project-members';
import { ProjectChat } from '../project-chat';

import type { Project } from 'src/types';

// ----------------------------------------------------------------------

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProjectDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProject(id);
    }
  }, [id]);

  const loadProject = async (projectId: string) => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await api.getProject(projectId);
      // setProject(response.project);
      
      // Demo data
      setProject({
        id: projectId,
        name: 'Website Redesign',
        description: 'Complete redesign of company website',
        teamId: '1',
        status: 'active',
        priority: 'high',
        members: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to load project:', error);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ py: 3 }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ py: 3 }}>
          <Typography>Project not found</Typography>
          <Button onClick={() => navigate('/projects')}>Back to Projects</Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Button startIcon={<Iconify icon="eva:arrow-back-fill" />} onClick={() => navigate('/projects')}>
            Back
          </Button>
        </Box>

        <Card sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {project.name}
              </Typography>
              {project.description && (
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip label={project.status} color={getStatusColor(project.status)} />
              <Label color={project.priority === 'urgent' ? 'error' : project.priority === 'high' ? 'warning' : 'info'}>
                {project.priority}
              </Label>
            </Box>
          </Box>
        </Card>

        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
              <Tab label="Tasks" />
              <Tab label="Chat" />
              <Tab label="Members" />
            </Tabs>
          </Box>

          <Box sx={{ p: 3 }}>
            <TabPanel value={tabValue} index={0}>
              <ProjectTasks projectId={project.id} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <ProjectChat projectId={project.id} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <ProjectMembers projectId={project.id} />
            </TabPanel>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

