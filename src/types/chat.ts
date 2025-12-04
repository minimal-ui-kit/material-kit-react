import type { User } from './team';

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  sender?: User;
  content: string;
  type: 'text' | 'file' | 'image' | 'system';
  fileUrl?: string;
  createdAt: string;
  readBy: string[];
}

export interface Chat {
  id: string;
  type: 'private' | 'project';
  name?: string;
  avatar?: string;
  participants: ChatParticipant[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  updatedAt: string;
  projectId?: string;
}

export interface ChatParticipant {
  id: string;
  chatId: string;
  userId: string;
  user?: User;
  joinedAt: string;
  lastReadAt?: string;
}

