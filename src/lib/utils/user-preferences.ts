import { writable } from 'svelte/store';

export const isSidebarVisible = (() => {
	const { subscribe, set } = writable(false);

	return {
		subscribe,
		show: () => set(true),
		hide: () => set(false)
	};
})();
