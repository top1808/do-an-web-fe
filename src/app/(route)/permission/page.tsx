import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

const PermissionPageComponent = dynamic(() => import('@/features/permission/Index'), { ssr: false });

export const metadata: Metadata = {
	title: 'Permission',
	description: 'Permission',
};

const PermissionPage = () => {
	return <PermissionPageComponent />;
};

export default PermissionPage;
