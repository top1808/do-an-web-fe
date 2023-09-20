'use client';
import MSpin from '@/components/MSpin';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const RootLoading = () => {
	const { auth } = useAppSelector((state) => state);

	const router = useRouter();

	useEffect(() => {
		if (auth?.isLoggedIn) {
			router.push('/admin');
		}
	}, [auth, router]);

	return (
		<div className='w-screen h-screen flex items-center justify-center'>
			<MSpin size='large'></MSpin>
		</div>
	);
};

export default RootLoading;
