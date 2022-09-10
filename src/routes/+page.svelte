<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fly } from 'svelte/transition';

	import dayjs from 'dayjs';

	import { debounce } from '$lib/helpers';
	import { sendMessage, socket, userID } from '$lib/websocket';

	let input: HTMLInputElement;
	let messageContainer: HTMLElement;
	let isMessageContainerScrolled = false;
	let messageList: WebSocket.ServerMessage[] = [];

	onMount(() => {
		input.value = '';

		socket.on('message', handleMessage);
		messageContainer.addEventListener('scroll', debounce(messageContainerScrollHandler));

		return () => {
			socket.off('message', handleMessage);
			messageContainer.removeEventListener('scroll', messageContainerScrollHandler);
		};
	});

	function messageContainerScrollHandler(event: Event) {
		isMessageContainerScrolled =
			messageContainer.scrollHeight > messageContainer.offsetHeight + messageContainer?.scrollTop ??
			false;
	}

	function handleSubmit() {
		if (!input?.value) return;

		sendMessage(input.value);
		input.value = '';
		input.focus();
	}

	async function handleMessage(message: WebSocket.ServerMessage) {
		// Append the newly received message to the message list
		messageList = [...messageList, message];

		// Wait for the message list container to update and scroll to the bottom
		await tick();
		messageContainer.scrollTo(0, messageContainer.scrollHeight);
	}
</script>

<header id="header">
	<h2>Chat app</h2>
	<h5>#{$userID ?? 'connecting ...'}</h5>
</header>

<main id="main">
	<header>
		<h5>Messages</h5>
		{#if isMessageContainerScrolled}
			<button
				id="previous"
				transition:fly={{ y: -20 }}
				on:click={() => {
					messageContainer?.scrollTo(0, messageContainer.scrollHeight);
				}}>New messages</button
			>
		{/if}
	</header>

	<main bind:this={messageContainer}>
		{#if messageList.length === 0}
			<h5 style="justify-self: center; padding-block: var(--size-5); color: var(--surface-4);">
				Write something!
			</h5>
		{/if}

		{#each messageList as message (message.messageID)}
			<span class="message" class:self={message.from === $userID}>
				<p>{message.message}</p>
				<small>{dayjs(message.time).format('HH:mm')}</small>
			</span>
		{/each}
	</main>
</main>

<footer id="footer">
	<form on:submit|preventDefault={handleSubmit}>
		<input bind:this={input} />
		<button>Send message</button>
	</form>
</footer>

<style lang="scss">
	:global(body) {
		display: flex;
		flex-direction: column;
		gap: var(--size-4);
		max-height: 100vh;
	}

	#header {
		display: flex;
		gap: var(--size-3);
		align-items: baseline;
		justify-content: space-between;
	}

	#main {
		background-color: var(--surface-2);
		border-radius: var(--radius-2);

		display: flex;
		flex-direction: column;
		flex-grow: 1;
		overflow: hidden;
		z-index: 1;

		> header {
			background-color: var(--surface-2);
			box-shadow: var(--shadow-2);

			padding: var(--size-4);
			min-width: 100%;
			position: relative;
			z-index: 1;

			> #previous {
				position: absolute;
				left: 50%;
				transform: translate(-50%, 90%);
				z-index: -1;
				transition: 300ms;
			}
		}

		> main {
			display: grid;
			gap: var(--size-2);

			padding: var(--size-4);
			overflow: hidden auto;

			.message {
				background-color: var(--surface-1);
				border-radius: var(--radius-2);
				box-shadow: var(--shadow-2);

				display: inline-grid;

				padding: var(--size-2) var(--size-3);
				word-break: break-all;
				max-width: 90%;
				width: fit-content;

				&.self {
					background-color: var(--brand);
					color: var(--gray-8);
					justify-self: end;
				}

				> p {
					font-size: var(--font-size-1);
					max-inline-size: unset;
				}

				> small {
					color: var(--gray-7);
					font-size: 0.55rem;
					font-weight: var(--font-weight-7);

					justify-self: end;
				}
			}
		}
	}

	#footer {
		form {
			display: flex;
			gap: var(--size-4);

			> input {
				flex-grow: 1;
				padding-inline: var(--size-3);
			}
		}
	}
</style>
