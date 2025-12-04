import { useState, useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { useSocket } from 'src/contexts/socket-context';
import { useAuth } from 'src/contexts/auth-context';

import { fTime } from 'src/utils/format-time';

import type { Chat, ChatMessage } from 'src/types';

// ----------------------------------------------------------------------

type ChatWindowProps = {
  chatId: string;
};

export function ChatWindow({ chatId }: ChatWindowProps) {
  const { user } = useAuth();
  const { sendMessage, joinChat, leaveChat, onMessage, offMessage, isConnected } = useSocket();
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isConnected && chatId) {
      joinChat(chatId);
      loadChat();
      loadMessages();
    }

    const handleMessage = (message: ChatMessage) => {
      if (message.chatId === chatId) {
        setMessages((prev) => [...prev, message]);
      }
    };

    onMessage(handleMessage);

    return () => {
      offMessage(handleMessage);
      if (isConnected) {
        leaveChat(chatId);
      }
    };
  }, [chatId, isConnected, joinChat, leaveChat, onMessage, offMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadChat = async () => {
    // TODO: Replace with actual API call
    // const response = await api.getChat(chatId);
    // setChat(response.chat);
    
    // Demo data
    setChat({
      id: chatId,
      type: 'private',
      participants: [],
      unreadCount: 0,
      updatedAt: new Date().toISOString(),
    });
  };

  const loadMessages = async () => {
    // TODO: Replace with actual API call
    // const response = await api.getChatMessages(chatId);
    // setMessages(response.messages);
    
    // Demo data
    setMessages([
      {
        id: '1',
        chatId,
        senderId: '2',
        content: 'Hello!',
        type: 'text',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        readBy: [],
        sender: {
          id: '2',
          name: 'Jane Doe',
          email: 'jane@example.com',
        },
      },
    ]);
  };

  const handleSend = () => {
    if (input.trim() && isConnected) {
      sendMessage(chatId, input.trim());
      setInput('');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">{chat?.name || 'Private Chat'}</Typography>
        {!isConnected && (
          <Typography variant="caption" color="error">
            Connecting...
          </Typography>
        )}
      </Box>

      <Scrollbar sx={{ flex: 1, p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {messages.map((message) => {
            const isOwn = message.senderId === user?.id;
            return (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  gap: 1,
                  justifyContent: isOwn ? 'flex-end' : 'flex-start',
                }}
              >
                {!isOwn && (
                  <Avatar sx={{ width: 32, height: 32 }} src={message.sender?.avatar}>
                    {message.sender?.name.charAt(0)}
                  </Avatar>
                )}
                <Box
                  sx={{
                    maxWidth: '70%',
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: isOwn ? 'primary.main' : 'grey.100',
                    color: isOwn ? 'primary.contrastText' : 'text.primary',
                  }}
                >
                  {!isOwn && (
                    <Typography variant="caption" sx={{ display: 'block', mb: 0.5, fontWeight: 'fontWeightSemiBold' }}>
                      {message.sender?.name}
                    </Typography>
                  )}
                  <Typography variant="body2">{message.content}</Typography>
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.7 }}>
                    {fTime(message.createdAt)}
                  </Typography>
                </Box>
              </Box>
            );
          })}
          <div ref={messagesEndRef} />
        </Box>
      </Scrollbar>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={!isConnected}
        />
        <IconButton color="primary" onClick={handleSend} disabled={!isConnected || !input.trim()}>
          <Iconify icon="mingcute:send-fill" />
        </IconButton>
      </Box>
    </Box>
  );
}

