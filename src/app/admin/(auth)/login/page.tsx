'use client';
import AdminLogin from '@/features/admin/login/Index';
import { useSession } from 'next-auth/react';
import React from 'react';

const AdminLoginPage = () => {
	return <AdminLogin />;
};

export default AdminLoginPage;
