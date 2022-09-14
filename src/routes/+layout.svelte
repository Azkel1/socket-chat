<!-- ---------------------------------------------------------- JS/TS ---------------------------------------------------------- -->
<script lang="ts">
	import type { LayoutData } from './$types';

	import { Toaster } from 'svelte-french-toast';
	import { currentChannel, userID, isSocketConnected } from '$lib/utils/websocket';

	import '../app.scss';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { MenuIcon } from '@rgossiaux/svelte-heroicons/solid';
	import { isSidebarVisible } from '$lib/utils/user-preferences';
	import { fade } from 'svelte/transition';

	export let data: LayoutData;

	$: isOverlayVisible = $isSidebarVisible;
</script>

<!-- ----------------------------------------------------------- HTML ---------------------------------------------------------- -->
<Sidebar {data} />

{#if $isSocketConnected}
	<nav>
		<button class="icon-button" on:click={() => isSidebarVisible.show()}>
			<MenuIcon />
		</button>

		{#if $currentChannel}
			<h5>Currently chatting on: {$currentChannel?.name}</h5>
		{/if}

		{#if $userID}
			<h5>#{$userID}</h5>
		{/if}
	</nav>

	<slot />
{:else}
	<main>
		<h1>Hold on tight!</h1>
		<h5>Connecting to the server...</h5>
	</main>
{/if}

<Toaster position="bottom-center" />
{#if isOverlayVisible}
	<div id="overlay" transition:fade />
{/if}

<!-- ----------------------------------------------------------- CSS ----------------------------------------------------------- -->
<style lang="scss">
	nav {
		background-color: var(--surface-2);
		border-radius: var(--radius-2);
		font-weight: var(--font-weight-3);

		display: grid;
		grid-auto-flow: column;
		align-items: center;
		justify-content: space-between;
		gap: var(--size-2);

		min-height: 50px;
		padding: var(--size-2) var(--size-3);
	}

	#overlay {
		background-color: rgba(0 0 0 / 0.3);
		inset: 0;
		width: 100vw;
		height: 100vh;
		position: absolute;
		z-index: var(--layer-4);
	}
</style>
