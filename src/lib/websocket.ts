import { io, Socket } from 'socket.io-client';

const SERVER_ENDPOINT = 'https://d45a-81-9-209-121.eu.ngrok.io/';

export const socket: Socket<WebSocket.ServerToClientEvents, WebSocket.ClientToServerEvents> =
	io(SERVER_ENDPOINT);

export function sendMessage(message: string): void {
	if (!message) return;

	socket.emit('message', message);
}
