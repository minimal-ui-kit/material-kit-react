import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

import type { ProjectMember } from 'src/types';

// ----------------------------------------------------------------------

type ProjectMembersProps = {
  projectId: string;
};

export function ProjectMembers({ projectId }: ProjectMembersProps) {
  const [members, setMembers] = useState<ProjectMember[]>([]);

  useEffect(() => {
    loadMembers();
  }, [projectId]);

  const loadMembers = async () => {
    // TODO: Replace with actual API call
    // const response = await api.getProject(projectId);
    // setMembers(response.project.members);
    
    // Demo data
    setMembers([
      {
        id: '1',
        projectId,
        userId: '1',
        role: 'manager',
        user: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          status: 'online',
        },
      },
    ]);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Project Members</Typography>
        <Button variant="outlined" startIcon={<Iconify icon="mingcute:add-line" />}>
          Add Member
        </Button>
      </Box>

      {members.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No members yet
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {members.map((member) => (
            <Card key={member.id} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={member.user?.avatar}>{member.user?.name.charAt(0)}</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2">{member.user?.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {member.user?.email} • {member.role}
                  </Typography>
                </Box>
                <IconButton size="small">
                  <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

