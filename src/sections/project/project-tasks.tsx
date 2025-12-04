import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';

import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

import type { Task } from 'src/types';

// ----------------------------------------------------------------------

type ProjectTasksProps = {
  projectId: string;
};

export function ProjectTasks({ projectId }: ProjectTasksProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  const loadTasks = async () => {
    // TODO: Replace with actual API call
    // const response = await api.getTasks(projectId);
    // setTasks(response.tasks);
    
    // Demo data
    setTasks([
      {
        id: '1',
        projectId,
        title: 'Design homepage mockup',
        description: 'Create initial design mockup for homepage',
        status: 'in-progress',
        priority: 'high',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        projectId,
        title: 'Setup development environment',
        description: 'Configure dev environment and dependencies',
        status: 'done',
        priority: 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
  };

  const getStatusColor = (status: Task['status']) => {
    const colors: Record<Task['status'], 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
      todo: 'default',
      'in-progress': 'info',
      review: 'warning',
      done: 'success',
    };
    return colors[status] || 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Tasks</Typography>
        <Button variant="contained" startIcon={<Iconify icon="mingcute:add-line" />}>
          Add Task
        </Button>
      </Box>

      {tasks.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No tasks yet. Create your first task!
        </Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <Card key={task.id} sx={{ mb: 1 }}>
              <ListItem>
                <Checkbox checked={task.status === 'done'} />
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle2">{task.title}</Typography>
                      <Chip label={task.status} color={getStatusColor(task.status)} size="small" />
                      <Label color={task.priority === 'urgent' ? 'error' : task.priority === 'high' ? 'warning' : 'info'} size="small">
                        {task.priority}
                      </Label>
                    </Box>
                  }
                  secondary={task.description}
                />
              </ListItem>
            </Card>
          ))}
        </List>
      )}
    </Box>
  );
}

