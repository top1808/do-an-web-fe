'use client';
import MSpin from '@/components/MSpin';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function RootLoading() {
	const session = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session.status === 'authenticated') {
			router.push('/admin');
		}
	}, [session, router]);

	return (
		<div className='w-screen h-screen flex items-center justify-center'>
			<MSpin size='large'></MSpin>
		</div>
	);
}
