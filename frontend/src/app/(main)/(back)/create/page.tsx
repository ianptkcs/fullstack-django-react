'use client';

import React, { useState, useContext } from 'react';
import { CsrfContext, CsrfProvider } from '@/context/CsrfContext';
import { useRouter } from 'next/navigation';

const CreateRoomPage = () => {
	const createRoomApi = process.env.NEXT_PUBLIC_CREATE_ROOM_API;
	const [guestCanPause, setGuestCanPause] = useState<boolean>(false);
	const [votesToSkip, setVotesToSkip] = useState<number>(2);
	const csrfToken = useContext(CsrfContext);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const dadosSala = {
			guest_can_pause: guestCanPause,
			votes_to_skip: votesToSkip,
		};

		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken, // Inclui o token CSRF
			},
			body: JSON.stringify(dadosSala),
			credentials: 'include' as RequestCredentials, // Inclui cookies na requisição
		};

		try {
			const response = await fetch(`${createRoomApi}`, requestOptions);

			if (!response.ok) {
				const err = await response.json();
				throw err;
			}

			const data = await response.json();
			router.push(`/room/${data.code}`);
		} catch (error) {
			console.error(`Erro: ${JSON.stringify(error)}`);
		}
	};

	return (
		<CsrfProvider>
			<form onSubmit={handleSubmit}>
				<label>
					Guest Can Pause:
					<input
						type='checkbox'
						checked={guestCanPause}
						onChange={(e) => setGuestCanPause(e.target.checked)}
					/>
				</label>
				<br />
				<label>
					Votes to Skip:
					<input
						className='form-control bg-slate-800'
						type='number'
						value={votesToSkip}
						onChange={(e) =>
							setVotesToSkip(parseInt(e.target.value))
						}
					/>
				</label>
				<br />
				<button type='submit'>Criar Room</button>
			</form>
		</CsrfProvider>
	);
};

export default CreateRoomPage;
