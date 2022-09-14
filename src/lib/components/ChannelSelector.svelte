<!-- ---------------------------------------------------------- JS/TS ---------------------------------------------------------- -->
<script lang="ts">
	import { currentChannel } from '$lib/utils/websocket';

	import type { Channel } from '@prisma/client';
	import { ArrowRightIcon } from '@rgossiaux/svelte-heroicons/solid';

	export let channels: Channel[];
</script>

<!-- ----------------------------------------------------------- HTML ---------------------------------------------------------- -->
<div id="channel-selector">
	<header>
		<h6>Channel selector</h6>
	</header>

	<ul>
		{#each channels as channel}
			<li
				data-id={channel.id}
				on:click={() => {
					currentChannel.switch(channel);
				}}
			>
				<span>#{channel.name}</span>
				<ArrowRightIcon />
			</li>
		{/each}
	</ul>
</div>

<!-- ----------------------------------------------------------- CSS ----------------------------------------------------------- -->
<style lang="scss">
	#channel-selector {
		background-color: var(--surface-2);
		border-radius: var(--radius-2);
		box-shadow: var(--shadow-2);

		display: grid;

		> * {
			padding: var(--size-3);
		}

		> header {
			box-shadow: var(--shadow-2);
		}

		> ul {
			display: grid;
			gap: var(--size-2);

			> li {
				background-color: var(--surface-3);
				border-radius: var(--radius-2);
				box-shadow: var(--shadow-1);
				cursor: pointer;
				font-size: var(--font-size-1);

				height: 2.5rem;
				display: flex;
				align-content: center;
				justify-content: space-between;

				padding: var(--size-2);
				transition: 300ms;

				&:hover {
					box-shadow: var(--shadow-2);
				}

				> :global(svg) {
					width: revert;
				}
			}
		}
	}
</style>
