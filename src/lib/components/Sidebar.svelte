<script lang="ts">
	import type { Note } from '$lib/pocketbase';
	import { Sidebar, SidebarWrapper, SidebarGroup, SidebarItem } from 'flowbite-svelte';
	import FileExplorer from '$lib/components/FileExplorer.svelte';

	export let notes: Note[] = [];
	let currentNoteId: string | null = null;
	export let searchQuery = '';
</script>

<Sidebar class="h-full w-64">
	<SidebarWrapper class="h-full overflow-y-auto bg-gray-800 px-3 py-4">
		<SidebarGroup class="mb-4">
			<input
				bind:value={searchQuery}
				class="w-full rounded border bg-gray-700 px-2 py-1.5 text-white shadow"
				placeholder="Search notes..."
			/>
		</SidebarGroup>
		<SidebarGroup label="Navigation">
			<SidebarItem href="/" label="Home" />
			<SidebarItem href="/notes" label="Notes" />
		</SidebarGroup>
		<SidebarGroup label="Notes">
			<FileExplorer {notes} {currentNoteId} />
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
