'use client';

import React, { useEffect, useRef, useState } from 'react';
import RoomInterface from '@/interfaces/Room';
import { useRouter } from 'next/navigation';

interface RoomPageProps {
	params: {
		code: string;
	};
}

const RoomPage = ({ params }: RoomPageProps) => {
	const getRoomApi = process.env.NEXT_PUBLIC_GET_ROOM_API;
	// 	const isAuthenticatedApi = process.env.NEXT_PUBLIC_IS_AUTHENTICATED_API;
	// const getAuthUrlAPI = process.env.NEXT_PUBLIC_GET_AUTH_URL_API;
	const { code } = params;
	const router = useRouter();
	// const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [room, setRoom] = useState<RoomInterface | null>(null);

	const hasFetched = useRef<string>();
	// const isAuthenticating = useRef<boolean>(false);

	const handleSettings = () => {
		router.push(`/room/${code}/settings`);
	};

	useEffect(() => {
		let isMounted = true;

		if (!code || hasFetched.current === code) return;

		const fetchRoom = async () => {
			try {
				const response = await fetch(`${getRoomApi}?code=${code}`, {
					method: 'GET',
					credentials: 'include',
					headers: { 'Content-Type': 'application/json' },
				});

				if (!response.ok) {
					throw new Error('Room not found');
				}

				const data = await response.json();

				if (isMounted) {
					setRoom(data);
					hasFetched.current = code;

					if (data.is_host) {
						// authenticateSpotify();
					}
				}
			} catch (error) {
				console.error('Error fetching room details:', error);
			}
		};

		fetchRoom();

		return () => {
			isMounted = false;
		};
	}, [code]);

	// const authenticateSpotify = async () => {
	// 	if (isAuthenticating.current) return;

	// 	isAuthenticating.current = true;

	// 	try {
	// 		const response = await fetch(`${isAuthenticatedApi}`, {
	// 			method: 'GET',
	// 			credentials: 'include',
	// 			headers: { 'Content-Type': 'application/json' },
	// 		});

	// 		const data = await response.json();

	// 		if (data.status) {
	// 			setIsAuthenticated(true);
	// 		} else {
	// 			try {
	// 				const response = await fetch(`${getAuthUrlAPI}`, {
	// 					method: 'GET',
	// 					credentials: 'include',
	// 					headers: { 'Content-Type': 'application/json' },
	// 				});

	// 				const authUrl = await response.json();
	// 				console.log('Auth URL:', authUrl.url);
	// 				router.push(authUrl.url);
	// 			} catch (error) {
	// 				console.error('Error getting auth URL:', error);
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.error('Error authenticating Spotify:', error);
	// 	} finally {
	// 		isAuthenticating.current = false;
	// 	}
	// };

	if (!room) {
		return <div>Loading room details...</div>;
	}

	return (
		<div>
			<p>Room code: {room.code}</p>
			<p>Host: {room.host}</p>
			<p>Session: {room.session}</p>
			<p>Is Host: {String(room.is_host)}</p>
			<p>Guest can pause: {room.guest_can_pause ? 'Yes' : 'No'}</p>
			<p>Votes to skip: {room.votes_to_skip}</p>
			<button onClick={handleSettings}>Settings</button>
		</div>
	);
};

export default RoomPage;
