// context/CsrfContext.js
'use client';

import React, { createContext, useState, useEffect, useRef } from 'react';
import { fetchCsrfToken } from '../utils/csrf';

export const CsrfContext = createContext<string>('');

import { ReactNode } from 'react';

interface CsrfProviderProps {
	children: ReactNode;
}

export const CsrfProvider = ({ children }: CsrfProviderProps) => {
	const [csrfToken, setCsrfToken] = useState('');
	const hasFetched = useRef(false);

	useEffect(() => {
		if (hasFetched.current) return;

		hasFetched.current = true;

		const getToken = async () => {
			try {
				const token = await fetchCsrfToken();
				setCsrfToken(token);
			} catch (error) {
				console.error('Erro ao buscar o token CSRF:', error);
			}
		};

		getToken();
	}, []);

	return (
		<CsrfContext.Provider value={csrfToken}>
			{children}
		</CsrfContext.Provider>
	);
};
