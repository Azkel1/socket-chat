import { Server } from 'socket.io';
import type { PluginOption } from 'vite';

export default function websocketServer(): PluginOption {
	return {
		name: 'websocket',
		configureServer(server) {
			if (server.httpServer) {
				const io = new Server<
					WebSocket.ClientToServerEvents,
					WebSocket.ServerToClientEvents,
					WebSocket.InterServerEvents,
					WebSocket.SocketData
				>(server.httpServer, {
					cors: {
						origin(requestOrigin, callback) {
							console.log(`New client connected from '${requestOrigin}'`);
							callback(null, requestOrigin);
						}
					}
				});
				let messageCount = 0;

				io.on('connection', (socket) => {
					let userID = Math.round(Math.random() * 999999);

					console.log('new user connected, current:', io.engine.clientsCount);

					socket.emit('welcome', {
						message: 'Welcome user!',
						userID
					});

					socket.on('message', (message) => {
						messageCount++;

						io.emit('message', {
							from: userID,
							message: message,
							messageID: messageCount,
							time: Date.now()
						});
					});
				});

				console.log('Socket.io injected!');
			}
		}
	};
}
