<!-- ---------------------------------------------------------- JS/TS ---------------------------------------------------------- -->
<script lang="ts">
	import type { LayoutData } from '.svelte-kit/types/src/routes/$types';
	import ChannelSelector from '$lib/components/ChannelSelector.svelte';
	import { isSidebarVisible } from '$lib/utils/user-preferences';
	import { XIcon } from '@rgossiaux/svelte-heroicons/solid';

	export let data: LayoutData;

	function setupOutsideClickHandler(node: Node) {
		const outsideClickHandler = (event: Event) => {
			console.log(event);

			if ($isSidebarVisible && event.target !== node) {
				console.log('hiding', $isSidebarVisible);

				isSidebarVisible.hide();
			}
		};

		document.body.addEventListener('click', outsideClickHandler);

		return {
			destroy() {
				document.body.removeEventListener('click', outsideClickHandler);
			}
		};
	}
</script>

<!-- ----------------------------------------------------------- HTML ---------------------------------------------------------- -->
<aside class:visible={$isSidebarVisible}>
	<header>
		<h3>Chat app</h3>
		<button class="icon-button" on:click={() => isSidebarVisible.hide()}>
			<XIcon />
		</button>
	</header>

	<ChannelSelector channels={data.channels} />
</aside>

<!-- ----------------------------------------------------------- CSS ----------------------------------------------------------- -->
<style lang="scss">
	aside {
		background: var(--surface-1);
		box-shadow: var(--shadow-3);

		display: flex;
		flex-direction: column;
		gap: var(--size-7);

		height: 100%;
		min-width: 250px;
		top: 0;
		left: 0;
		position: fixed;
		padding: var(--size-5);
		z-index: var(--layer-5);
		transform: translateX(-100%);
		transition: 300ms;

		&.visible {
			transform: translateX(0);
		}

		> header {
			display: flex;
			align-items: end;
			justify-content: space-between;
			gap: var(--size-2);
		}
	}
</style>
