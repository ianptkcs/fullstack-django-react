'use client';

import React, { useState, useEffect } from 'react';
import RoomInterface from '@/interfaces/Room';

const ListRoomPage: React.FC = () => {
	const roomApi = process.env.NEXT_PUBLIC_ROOM_API;
	const [salas, setSalas] = useState<RoomInterface[]>([]);
	const [erro, setErro] = useState(null);
	const [carregando, setCarregando] = useState(true);

	useEffect(() => {
		fetch(`${roomApi}`)
			.then(async (response) => {
				console.log(response);
				if (!response.ok) {
					throw new Error(`Erro: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setSalas(data);
				setCarregando(false);
			})
			.catch((error) => {
				setErro(error.message);
				setCarregando(false);
			});
	}, []);

	if (carregando) return <p>Carregando...</p>;
	if (erro) return <p>{erro}</p>;

	return (
		<div>
			<h2>Lista de Salas</h2>
			<ul>
				{salas.map((sala) => (
					<li key={sala.id}>
						{sala.host} - {sala.code}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ListRoomPage;
