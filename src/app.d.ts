// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

declare namespace WebSocket {
	interface ServerMessage {
		from: number;
		message: string;
		messageID: number;
		time: number;
	}

	interface ServerToClientEvents {
		welcome: ({ userID: number, message: string }) => void;
		message: (message: ServerMessage) => void;
	}

	interface ClientToServerEvents {
		message: (message: string) => void;
	}

	interface InterServerEvents {
		ping: () => void;
	}

	interface SocketData {
		name: string;
		age: number;
	}
}
