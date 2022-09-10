import { readable, writable } from 'svelte/store';
import { io, Socket } from 'socket.io-client';
import { PUBLIC_SERVER_URL } from '$env/static/public';

export const socket: Socket<WebSocket.ServerToClientEvents, WebSocket.ClientToServerEvents> =
	io(PUBLIC_SERVER_URL);

export const userID = readable<number | null>(null, (set) => {
	socket.once('welcome', (welcome) => {
		set(welcome.userID);
	});
});

export const isSocketConnected = readable(false, (set) => {
	socket?.once('connect', () => {
		set(true);
	});
});

export function sendMessage(message: string): void {
	if (!message) return;

	socket.emit('message', message);
}
