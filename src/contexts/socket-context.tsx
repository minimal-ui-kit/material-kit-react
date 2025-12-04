import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from 'react';
import { io, type Socket } from 'socket.io-client';

import type { ChatMessage } from 'src/types';

// ----------------------------------------------------------------------

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  sendMessage: (chatId: string, content: string, type?: 'text' | 'file' | 'image') => void;
  joinChat: (chatId: string) => void;
  leaveChat: (chatId: string) => void;
  onMessage: (callback: (message: ChatMessage) => void) => void;
  offMessage: (callback: (message: ChatMessage) => void) => void;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

// ----------------------------------------------------------------------

type SocketProviderProps = {
  children: ReactNode;
  userId: string;
  serverUrl?: string;
};

export function SocketProvider({ children, userId, serverUrl = 'http://localhost:3001' }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const messageCallbacksRef = useRef<Set<(message: ChatMessage) => void>>(new Set());

  useEffect(() => {
    if (!userId) return;

    const newSocket = io(serverUrl, {
      auth: { userId },
      transports: ['websocket', 'polling'],
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });

    newSocket.on('message', (message: ChatMessage) => {
      messageCallbacksRef.current.forEach((callback) => callback(message));
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userId, serverUrl]);

  const sendMessage = (chatId: string, content: string, type: 'text' | 'file' | 'image' = 'text') => {
    if (socket && isConnected) {
      socket.emit('sendMessage', { chatId, content, type });
    }
  };

  const joinChat = (chatId: string) => {
    if (socket && isConnected) {
      socket.emit('joinChat', chatId);
    }
  };

  const leaveChat = (chatId: string) => {
    if (socket && isConnected) {
      socket.emit('leaveChat', chatId);
    }
  };

  const onMessage = (callback: (message: ChatMessage) => void) => {
    messageCallbacksRef.current.add(callback);
  };

  const offMessage = (callback: (message: ChatMessage) => void) => {
    messageCallbacksRef.current.delete(callback);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        sendMessage,
        joinChat,
        leaveChat,
        onMessage,
        offMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}

