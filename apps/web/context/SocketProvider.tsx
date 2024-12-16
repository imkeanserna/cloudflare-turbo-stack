"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface ISocketContext {
  socket: WebSocket | null;
  sendMessage: (event: string, data?: any) => void;
  isConnected: boolean;
  messages: string[];
}

const SocketContext = createContext<ISocketContext | null>(null);

export const useWebSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("useSocket must be used within a SocketProvider");

  return state;
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const sendMessage = useCallback((event: string, data?: any) => {
    if (!socket) throw new Error("socket not ready");

    socket.send(JSON.stringify({
      event: "init_game",
    }));
  }, [socket]);

  const onMessageReceived = useCallback((event: MessageEvent) => {
    const { message } = JSON.parse(event.data) as { message: string };
    setMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    const _socket = new WebSocket("ws://localhost:3001");
    setSocket(_socket);

    _socket.onopen = () => {
      setIsConnected(true);
    }

    _socket.onmessage = onMessageReceived;

    _socket.onclose = () => {
      setIsConnected(false);
    }


    return () => {
      if (_socket) {
        _socket.close();
      }
    }
  }, []);

  return <SocketContext.Provider
    value={{ socket, sendMessage, isConnected, messages }}>
    {children}
  </SocketContext.Provider>;
};
