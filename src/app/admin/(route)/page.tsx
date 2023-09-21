'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
	const session = useSession();
	console.log('🚀 ~ file: page.tsx:8 ~ AdminLoginPage ~ session:', session?.data.user);
	return <main className='p-24'>to1p12323</main>;
}
