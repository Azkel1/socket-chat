import { readable, writable } from 'svelte/store';
import { io, Socket } from 'socket.io-client';
import { toast } from 'svelte-french-toast';
import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { Channel } from '@prisma/client';

export const socket: Socket<WebSocket.ServerToClientEvents, WebSocket.ClientToServerEvents> =
	io(PUBLIC_SERVER_URL);

export const userID = readable<number | null>(null, (set) => {
	socket.once('welcome', (welcome) => {
		set(welcome.userID);
	});
});

export const currentChannel = (() => {
	const { subscribe, update } = writable<Channel | null>(null);

	return {
		subscribe,
		switch: (channel: Channel) => {
			update((current) => {
				if (channel.id === current?.id) return current;

				toast.success(`Switched to channel #${channel.name}!`);
				return channel;
			});
		}
	};
})();

export const isSocketConnected = readable(false, (set) => {
	socket?.once('connect', () => {
		set(true);
		toast.success('Connected!');
	});
});

export function sendMessage(message: string): void {
	if (!message) return;

	socket.emit('message', message);
}
