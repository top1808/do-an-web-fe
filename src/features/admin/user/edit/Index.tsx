'use client';
import { User } from '@/models/userModel';
import { useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import UserForm from '../components/Form';

const AdminEditUserComponent = () => {
	const onSubmit = () => {
		console.log('onSubmit');
	};
	return (
		<div>
			<UserForm onSubmit={onSubmit} />
		</div>
	);
};

export default AdminEditUserComponent;
