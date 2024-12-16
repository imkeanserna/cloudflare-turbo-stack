import { createContext, useContext } from "react";

interface ISocketContext {
  socket: WebSocket | null;
  sendMessage: (event: string, data?: any) => void;
  errorMessage: string | null;
  on: (event: string, eventHandler: (data: any) => void) => void;
}

export const SocketContext = createContext<ISocketContext | null>(null);

export function useSocketContext() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
}
