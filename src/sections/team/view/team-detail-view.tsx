import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { Iconify } from 'src/components/iconify';

import { TeamMembers } from '../team-members';
import { TeamProjects } from '../team-projects';

import type { Team } from 'src/types';

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

export default function TeamDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<Team | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadTeam(id);
    }
  }, [id]);

  const loadTeam = async (teamId: string) => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await api.getTeam(teamId);
      // setTeam(response.team);
      
      // Demo data
      setTeam({
        id: teamId,
        name: 'Development Team',
        description: 'Main development team',
        ownerId: '1',
        members: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to load team:', error);
    } finally {
      setLoading(false);
    }
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

  if (!team) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ py: 3 }}>
          <Typography>Team not found</Typography>
          <Button onClick={() => navigate('/teams')}>Back to Teams</Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Button startIcon={<Iconify icon="eva:arrow-back-fill" />} onClick={() => navigate('/teams')}>
            Back
          </Button>
        </Box>

        <Card sx={{ p: 3, mb: 3 }}>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {team.name}
          </Typography>
          {team.description && (
            <Typography variant="body2" color="text.secondary">
              {team.description}
            </Typography>
          )}
        </Card>

        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
              <Tab label="Projects" />
              <Tab label="Members" />
            </Tabs>
          </Box>

          <Box sx={{ p: 3 }}>
            <TabPanel value={tabValue} index={0}>
              <TeamProjects teamId={team.id} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <TeamMembers teamId={team.id} />
            </TabPanel>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

