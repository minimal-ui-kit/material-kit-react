import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import { TeamsList } from '../teams-list';
import { TeamCreateDialog } from '../team-create-dialog';

import type { Team } from 'src/types';

// ----------------------------------------------------------------------

export default function TeamsView() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await api.getTeams();
      // setTeams(response.teams);
      
      // Demo data
      setTeams([
        {
          id: '1',
          name: 'Development Team',
          description: 'Main development team',
          ownerId: '1',
          members: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Failed to load teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async (data: { name: string; description?: string }) => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.createTeam(data);
      // setTeams((prev) => [response.team, ...prev]);
      
      const newTeam: Team = {
        id: Date.now().toString(),
        ...data,
        ownerId: '1',
        members: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTeams((prev) => [newTeam, ...prev]);
      setOpenCreate(false);
    } catch (error) {
      console.error('Failed to create team:', error);
    }
  };

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
        <Typography variant="h4">Teams</Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenCreate(true)}
        >
          Create Team
        </Button>
      </Box>

      <Card>
        <TeamsList teams={teams} loading={loading} />
      </Card>

      <TeamCreateDialog open={openCreate} onClose={() => setOpenCreate(false)} onCreate={handleCreateTeam} />
    </Container>
  );
}

