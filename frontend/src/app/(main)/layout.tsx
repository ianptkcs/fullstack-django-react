'use client';

import React, { Suspense } from 'react';
import LoadingOtherPages from './loading';

const DefaultPage: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	return (
		<div className='flex flex-col mt-[5%] h-full gap-24 items-center justify-center'>
			<h1 className='text-2xl'>Bla bla</h1>
			<Suspense fallback={<LoadingOtherPages />}>{children}</Suspense>
		</div>
	);
};

export default DefaultPage;
