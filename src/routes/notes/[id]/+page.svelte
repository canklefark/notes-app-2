<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getNote, updateNote } from '$lib/pocketbase';
	import type { Note } from '$lib/pocketbase';
	import { Input, Textarea, Button } from 'flowbite-svelte';

	let note: Note | null = null;
	let title = '';
	let content = '';
	let isEditing = false;

	onMount(async () => {
		await loadNote();
	});

	$: if ($page.params.id) {
		loadNote();
	}

	async function loadNote() {
		try {
			note = await getNote($page.params.id);
			title = note.title;
			content = note.content;
		} catch (error) {
			console.error('Error loading note:', error);
		}
	}

	async function handleUpdate() {
		if (note) {
			try {
				await updateNote(note.id, title, content);
				isEditing = false;
				await loadNote();
			} catch (error) {
				console.error('Error updating note:', error);
			}
		}
	}
</script>

{#if note}
	{#if isEditing}
		<form on:submit|preventDefault={handleUpdate} class="space-y-4">
			<Input type="text" bind:value={title} placeholder="Note title" />
			<Textarea bind:value={content} rows="10" placeholder="Note content" />
			<Button type="submit">Save</Button>
			<Button color="light" on:click={() => (isEditing = false)}>Cancel</Button>
		</form>
	{:else}
		<div class="space-y-4">
			<h1 class="text-2xl font-bold">{note.title}</h1>
			<p class="whitespace-pre-wrap">{note.content}</p>
			<Button on:click={() => (isEditing = true)}>Edit</Button>
		</div>
	{/if}
{:else}
	<p>Loading note...</p>
{/if}
