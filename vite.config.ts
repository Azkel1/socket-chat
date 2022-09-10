import websocketServer from './vite-plugin-websocket';
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit(), websocketServer()]
};

export default config;
