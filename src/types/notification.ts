export interface Notification {
  id: string;
  userId: string;
  type: 'team_invite' | 'project_assigned' | 'task_assigned' | 'message' | 'mention' | 'system';
  title: string;
  message: string;
  read: boolean;
  link?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

