import WebSocket from 'ws';

declare module 'ws' {
  export interface WebSocketClient extends WebSocket.WebSocket {
    id?: string;
  }
}