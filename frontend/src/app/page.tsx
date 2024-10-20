// pages/index.js ou app/page.js (dependendo da estrutura do seu projeto)

'use client'; // Indica que este é um componente cliente

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const MainPage = () => {
	const router = useRouter();
	const userInRoomAPI = process.env.NEXT_PUBLIC_USER_IN_ROOM_API;

	useEffect(() => {
		const checkUserInRoom = async () => {
			try {
				const response = await fetch(`${userInRoomAPI}`, {
					method: 'GET',
					credentials: 'include', // Certifique-se de que os cookies estão sendo enviados
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					throw new Error('Failed to fetch room code');
				}

				const data = await response.json();
				const roomCode = data.code;

				if (roomCode) {
					router.push(`/room/${roomCode}`);
				}
			} catch (error) {
				console.error('Error:', error);
				// Opcional: Você pode definir um estado para exibir uma mensagem de erro ao usuário
			}
		};

		checkUserInRoom();
	}, [userInRoomAPI, router]);

	return (
		<div className='flex flex-col gap-4'>
			<h1>Home</h1>
			<Link href={'/create'}>Create Room</Link>
			<Link href={'/join'}>Join Room</Link>
		</div>
	);
};

export default MainPage;
