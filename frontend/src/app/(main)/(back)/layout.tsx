'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const BackButtonLayout: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const historyStackRef = useRef<string[]>([]);

	// Update the history stack when the pathname changes
	useEffect(() => {
		const historyStack = historyStackRef.current;
		if (historyStack[historyStack.length - 1] !== pathname) {
			historyStack.push(pathname);
		}
	}, [pathname]);

	const handleBack = () => {
		const historyStack = historyStackRef.current;
		if (historyStack.length > 1) {
			// Remove the current page from the history stack
			historyStack.pop();
			// Navigate to the previous page in your history stack
			const previousPath = historyStack[historyStack.length - 1];
			router.push(previousPath);
		} else {
			// Navigate to the home page if there's no history
			router.push('/');
		}
	};

	return (
		<div>
			{children}
			<button onClick={handleBack}>Back</button>
		</div>
	);
};

export default BackButtonLayout;
