'use client';
import { User } from '@/models/userModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import UserForm from '../components/Form';
import { useParams } from 'next/navigation';
import { edittingUser, gettingUser } from '@/redux/reducers/userReducer';

const AdminEditUserComponent = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const onSubmit = (data: User) => {
		dispatch(edittingUser({ ...data, _id: id as string }));
	};

	useEffect(() => {
		if (id) {
			dispatch(gettingUser(id as string));
		}
	}, [dispatch, id]);

	return (
		<div>
			<UserForm onSubmit={onSubmit} />
		</div>
	);
};

export default AdminEditUserComponent;
