'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const JoinRoomPage = () => {
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const roomCode = (
			e.currentTarget.elements.namedItem('room-code') as HTMLInputElement
		).value;

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ code: roomCode }),
			credentials: 'include' as RequestCredentials,
		};

		fetch(
			`${process.env.NEXT_PUBLIC_JOIN_ROOM_API}?code=${roomCode}`,
			requestOptions
		)
			.then(async (response) => {
				if (!response.ok) {
					const err = await response.json();
					throw err;
				}
				router.push(`/room/${roomCode}`);
			})
			.catch((error) => {
				console.log(`Error: ${JSON.stringify(error)}`);
			});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='room-code'>Room Code:</label>
				<input
					type='text'
					id='room-code'
					name='room-code'
					className='bg-slate-600'
				/>
				<button type='submit'>Join Room</button>
			</form>
		</div>
	);
};

export default JoinRoomPage;
