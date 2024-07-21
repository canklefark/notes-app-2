import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');

export interface Note {
	id: string;
	title: string;
	content: string;
	created: string;
	updated: string;
}

export async function createNote(title: string, content: string): Promise<Note> {
	return await pb.collection('notes').create<Note>({ title, content });
}

export async function getNotes(): Promise<Note[]> {
	return await pb.collection('notes').getFullList<Note>();
}

export async function getNote(id: string): Promise<Note> {
	return await pb.collection('notes').getOne<Note>(id);
}

export async function updateNote(id: string, title: string, content: string): Promise<Note> {
	return await pb.collection('notes').update<Note>(id, { title, content });
}

export async function deleteNote(id: string): Promise<boolean> {
	return await pb.collection('notes').delete(id);
}
