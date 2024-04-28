'use client';
import AdminLogin from '@/features/login/Index';
import { useAppSelector } from '@/redux/hooks';
import { getAuthState } from '@/redux/reducers/authReducer';
import { useRouter } from 'next-nprogress-bar';
import React, { useEffect } from 'react';

const AdminLoginPage = () => {
	const router = useRouter();
	const auth = useAppSelector(getAuthState);

	useEffect(() => {
		if (auth.isLoggedIn) {
			window.location.assign('/');
		}
	}, [auth, router]);

	return <AdminLogin />;
};

export default AdminLoginPage;
