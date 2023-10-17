'use client';
import AdminLogin from '@/features/login/Index';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AdminLoginPage = () => {
	const router = useRouter();
	const { auth } = useAppSelector((state) => state);

	useEffect(() => {
		if (auth.isLoggedIn) {
			window.location.assign('/admin');
		}
	}, [auth, router]);

	return <AdminLogin />;
};

export default AdminLoginPage;
