import { lazy } from 'react';

const ChatView = lazy(() => import('src/sections/chat/view/chat-view'));

// ----------------------------------------------------------------------

export default function ChatPage() {
  return <ChatView />;
}

