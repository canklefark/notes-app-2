<script lang="ts">
	import { List, ListgroupItem } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import type { Note } from '$lib/pocketbase';

	export let notes: Note[] = [];
	export let currentNoteId: string | null = null;

	function navigateToNote(id: string) {
		goto(`/notes/${id}`);
	}
</script>

<div class="h-full overflow-y-auto bg-gray-800 p-4">
	<h2 class="mb-4 text-xl font-semibold">Notes</h2>
	<List>
		{#each notes as note}
			<ListgroupItem
				on:click={() => navigateToNote(note.id)}
				class="cursor-pointer transition-colors duration-150 ease-in-out hover:bg-gray-700"
				active={currentNoteId === note.id}
			>
				{note.title}
			</ListgroupItem>
		{/each}
	</List>
</div>
