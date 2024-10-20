'use client';

import React, { useState, useContext, useEffect } from 'react';
import { CsrfContext, CsrfProvider } from '@/context/CsrfContext';
import { useRouter } from 'next/navigation';

interface RoomSettingsPageProps {
	params: {
		code: string;
	};
}

const RoomSettingsPage = ({ params }: RoomSettingsPageProps) => {
	const updateRoomAPI = process.env.NEXT_PUBLIC_UPDATE_ROOM_API;
	const getRoomApi = process.env.NEXT_PUBLIC_GET_ROOM_API;
	const [guestCanPause, setGuestCanPause] = useState<boolean>();
	const [votesToSkip, setVotesToSkip] = useState<number>();
	const [updated, setUpdated] = useState<boolean>(false);
	const csrfToken = useContext(CsrfContext);
	const router = useRouter();
	const { code } = params;

	useEffect(() => {
		const fetchRoomDetails = async () => {
			try {
				const response = await fetch(`${getRoomApi}?code=${code}`, {
					method: 'GET',
					credentials: 'include' as RequestCredentials,
					headers: { 'Content-Type': 'application/json' },
				});

				if (!response.ok) {
					console.error('Room not found');
					return;
				}

				const data = await response.json();
				setGuestCanPause(data.guest_can_pause);
				setVotesToSkip(data.votes_to_skip);
			} catch (error) {
				console.error('Error fetching room details:', error);
			}
		};

		fetchRoomDetails();
	}, [code]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const dadosSala = {
			guest_can_pause: guestCanPause,
			votes_to_skip: votesToSkip,
			code: code,
		};

		const requestOptions = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken,
			},
			body: JSON.stringify(dadosSala),
			credentials: 'include' as RequestCredentials,
		};

		try {
			const response = await fetch(`${updateRoomAPI}`, requestOptions);

			if (!response.ok) {
				const err = await response.json();
				throw err;
			}

			setUpdated(true);
			alert('Room updated!');
		} catch (error) {
			console.error(`Erro: ${JSON.stringify(error)}`);
			alert('Error updating room');
		}
	};

	const handleBack = () => {
		router.back();
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
				<button type='submit'>Update Room</button>
			</form>
			{updated && <p>Room updated!</p>}
			<button onClick={handleBack}>Back</button>
		</CsrfProvider>
	);
};

export default RoomSettingsPage;
