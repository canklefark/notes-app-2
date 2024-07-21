<script lang="ts">
	import { createNote } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { Button, Input, Textarea, Alert } from 'flowbite-svelte';

	let title = '';
	let content = '';
	let isSubmitting = false;
	let submitMessage = '';

	async function handleSubmit(event: Event) {
		event.preventDefault();
		if (title && content) {
			isSubmitting = true;
			submitMessage = '';
			try {
				const newNote = await createNote(title, content);
				title = '';
				content = '';
				submitMessage = 'Note created successfully!';
				goto(`/notes/${newNote.id}`);
			} catch (error) {
				console.error('Error creating note:', error);
				submitMessage = 'Error creating note. Please try again.';
			} finally {
				isSubmitting = false;
			}
		}
	}
</script>

<div class="p-4">
	<h1 class="mb-4 text-2xl font-bold">Create New Note</h1>

	<form on:submit={handleSubmit} class="space-y-4">
		<Input type="text" bind:value={title} placeholder="Note title" />
		<Textarea bind:value={content} rows="10" placeholder="Note content" />
		<Button type="submit" disabled={isSubmitting}>
			{isSubmitting ? 'Creating...' : 'Create Note'}
		</Button>
	</form>

	{#if submitMessage}
		<Alert color={submitMessage.includes('Error') ? 'red' : 'green'} class="mt-4">
			{submitMessage}
		</Alert>
	{/if}
</div>
