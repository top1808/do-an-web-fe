import { User } from '@/models/userModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import UserForm from '../components/Form';
import { creatingUser } from '@/redux/reducers/userReducer';

const AdminCreateUserComponent = () => {
	const dispatch = useAppDispatch();

	const onSubmit = (data: User) => {
		dispatch(creatingUser(data));
	};

	return (
		<div>
			<UserForm onSubmit={onSubmit} />
		</div>
	);
};

export default AdminCreateUserComponent;
