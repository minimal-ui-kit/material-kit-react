import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import { fDate } from 'src/utils/format-time';

import type { Team } from 'src/types';

// ----------------------------------------------------------------------

type TeamsListProps = {
  teams: Team[];
  loading?: boolean;
};

export function TeamsList({ teams, loading }: TeamsListProps) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        {[1, 2, 3].map((i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Skeleton variant="rectangular" height={120} />
          </Box>
        ))}
      </Box>
    );
  }

  if (teams.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No teams found. Create your first team to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {teams.map((team) => (
        <Card key={team.id} sx={{ mb: 2 }}>
          <CardActionArea onClick={() => navigate(`/teams/${team.id}`)}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ width: 56, height: 56 }}>{team.name.charAt(0)}</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">{team.name}</Typography>
                  {team.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {team.description}
                    </Typography>
                  )}
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    {team.members.length} members • Created {fDate(team.createdAt)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

