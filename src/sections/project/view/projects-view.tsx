import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { Iconify } from 'src/components/iconify';

import { ProjectsList } from '../projects-list';
import { ProjectCreateDialog } from '../project-create-dialog';

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

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await api.getProjects();
      // setProjects(response.projects);
      
      // Demo data
      setProjects([
        {
          id: '1',
          name: 'Website Redesign',
          description: 'Complete redesign of company website',
          teamId: '1',
          status: 'active',
          priority: 'high',
          members: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Mobile App',
          description: 'New mobile application development',
          teamId: '1',
          status: 'planning',
          priority: 'medium',
          members: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (data: {
    name: string;
    description?: string;
    teamId: string;
    status: Project['status'];
    priority: Project['priority'];
  }) => {
    try {
      // TODO: Replace with actual API call
      const newProject: Project = {
        id: Date.now().toString(),
        ...data,
        members: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProjects((prev) => [newProject, ...prev]);
      setOpenCreate(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (tabValue === 0) return true; // All
    if (tabValue === 1) return project.status === 'active';
    if (tabValue === 2) return project.status === 'planning';
    if (tabValue === 3) return project.status === 'completed';
    return true;
  });

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          py: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4">Projects</Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenCreate(true)}
        >
          Create Project
        </Button>
      </Box>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
            <Tab label="All" />
            <Tab label="Active" />
            <Tab label="Planning" />
            <Tab label="Completed" />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          <TabPanel value={tabValue} index={0}>
            <ProjectsList projects={filteredProjects} loading={loading} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ProjectsList projects={filteredProjects} loading={loading} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <ProjectsList projects={filteredProjects} loading={loading} />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <ProjectsList projects={filteredProjects} loading={loading} />
          </TabPanel>
        </Box>
      </Card>

      <ProjectCreateDialog open={openCreate} onClose={() => setOpenCreate(false)} onCreate={handleCreateProject} />
    </Container>
  );
}

