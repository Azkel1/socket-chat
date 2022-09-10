/**
 * Wait for the given 'timeout' amount (ms) before executing the given callback.
 * If the function is called again before the 'timeout' expires, the timer is reset.
 *
 * @param func Callback function to call when the timer expires
 * @param timeout Timeout for the timer
 * @returns The given function but debounced
 */
export function debounce(this: unknown, func: Function, timeout = 300) {
	let timer: NodeJS.Timeout;

	return (...args: unknown[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}
