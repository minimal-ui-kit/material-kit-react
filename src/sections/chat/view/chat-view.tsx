import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';

import { ChatWindow } from '../chat-window';

import type { Chat } from 'src/types';

// ----------------------------------------------------------------------

export default function ChatView() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await api.getChats();
      // setChats(response.chats);
      
      // Demo data
      setChats([
        {
          id: '1',
          type: 'private',
          participants: [],
          unreadCount: 2,
          updatedAt: new Date().toISOString(),
          lastMessage: {
            id: '1',
            chatId: '1',
            senderId: '2',
            content: 'Hey, how are you?',
            type: 'text',
            createdAt: new Date().toISOString(),
            readBy: [],
          },
        },
        {
          id: '2',
          type: 'project',
          name: 'Website Redesign',
          participants: [],
          unreadCount: 0,
          updatedAt: new Date().toISOString(),
          projectId: '1',
        },
      ]);
    } catch (error) {
      console.error('Failed to load chats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Messages
        </Typography>

        <Card sx={{ display: 'flex', height: 700 }}>
          <Box sx={{ width: 350, borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">Chats</Typography>
            </Box>
            <List sx={{ flex: 1, overflow: 'auto' }}>
              {chats.map((chat, index) => (
                <div key={chat.id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedChat === chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <ListItemAvatar>
                        <Badge badgeContent={chat.unreadCount} color="error">
                          <Avatar>{chat.name?.charAt(0) || 'C'}</Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={chat.name || 'Private Chat'}
                        secondary={chat.lastMessage?.content}
                      />
                    </ListItemButton>
                  </ListItem>
                  {index < chats.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          </Box>

          <Box sx={{ flex: 1 }}>
            {selectedChat ? (
              <ChatWindow chatId={selectedChat} />
            ) : (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Select a chat to start messaging
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

