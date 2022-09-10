<script lang="ts">
	import { isSocketConnected } from '$lib/websocket';

	import '../app.scss';
</script>

{#if $isSocketConnected}
	<slot />
{:else}
	<main>
		<h1>Hold on tight!</h1>
		<h5>Connecting to the server...</h5>
	</main>
{/if}
