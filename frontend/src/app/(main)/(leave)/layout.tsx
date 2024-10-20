'use client';

import { CsrfContext } from '@/context/CsrfContext';
import React, { useContext } from 'react';

const LeaveButtonLayout: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const leaveRoomAPI = process.env.NEXT_PUBLIC_LEAVE_ROOM_API;
	const csrfToken = useContext(CsrfContext);

	const leaveRoom = async () => {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken,
			},
			credentials: 'include' as RequestCredentials,
		};

		try {
			const response = await fetch(`${leaveRoomAPI}`, requestOptions);

			if (!response.ok) {
				const err = await response.json();
				throw err;
			}

			window.location.href = '/';
		} catch (error) {
			console.error(`Erro: ${JSON.stringify(error)}`);
		}
	};

	return (
		<div>
			{children}
			<button onClick={leaveRoom}>Leave</button>
		</div>
	);
};

export default LeaveButtonLayout;
