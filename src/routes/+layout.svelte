<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { getNotes } from '$lib/pocketbase';
	import type { Note } from '$lib/pocketbase';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let notes: Note[] = [];
	let searchQuery = '';

	onMount(async () => {
		notes = await getNotes();
	});

	$: filteredNotes = notes.filter((note) =>
		note.title.toLowerCase().includes(searchQuery.toLowerCase())
	);
</script>

<div class="flex h-screen bg-gray-900 text-white">
	<Sidebar bind:searchQuery />

	<main class="flex-1 overflow-y-auto p-4">
		<slot />
	</main>
</div>

<style>
	:global(body) {
		background-color: #1a202c;
		color: #ffffff;
		margin: 0;
		padding: 0;
	}

	:global(#svelte) {
		display: contents;
	}
</style>
