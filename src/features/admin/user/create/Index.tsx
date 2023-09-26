import { User } from '@/models/userModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import UserForm from '../components/Form';
import { creatingUser } from '@/redux/reducers/userReducer';
import { useRouter } from 'next/navigation';

const AdminCreateUserComponent = () => {
	const { user } = useAppSelector((state) => state);

	const dispatch = useAppDispatch();
	const router = useRouter();

	const onSubmit = (data: User) => {
		dispatch(creatingUser(data));
	};

	useEffect(() => {
		if (user.status === 'completed') {
			router.push('/admin/user');
		}
	}, [user.status, router]);

	return (
		<div>
			<UserForm onSubmit={onSubmit} />
		</div>
	);
};

export default AdminCreateUserComponent;
