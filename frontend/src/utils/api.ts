// utils/api.js

import RoomInterface from '@/interfaces/Room';
import { fetchCsrfToken } from '@/utils/csrf';

export async function criarRoom(roomData: RoomInterface) {
	const csrfToken = await fetchCsrfToken();

	const response = await fetch('http://localhost:8000/criar-room/', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrfToken, // Inclui o token CSRF
		},
		body: JSON.stringify(roomData),
	});

	if (!response.ok) {
		throw new Error('Failed to create room');
	}

	return await response.json();
}

export async function entrarRoom(roomId: number) {
	const csrfToken = await fetchCsrfToken();

	const response = await fetch(
		`http://localhost:8000/entrar-room/${roomId}/`,
		{
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken, // Inclui o token CSRF
			},
			body: JSON.stringify({
				/* dados para entrar na room */
			}),
		}
	);

	if (!response.ok) {
		throw new Error('Failed to enter room');
	}

	return await response.json();
}
