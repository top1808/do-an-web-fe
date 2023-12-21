'use client';
import { User } from '@/models/userModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import UserForm from '../components/Form';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { edittingUser, gettingUser } from '@/redux/reducers/userReducer';
import { Tabs, TabsProps } from 'antd';
import { useRouter } from 'next-nprogress-bar';
import { objectToQueryString } from '@/utils/FuntionHelpers';
import FormChangePassword from '../components/FormChangePassword';

const items: TabsProps['items'] = [
	{
		key: 'infor',
		label: 'Information',
	},
	{
		key: 'changePassword',
		label: 'Change Password',
	},
];

const AdminEditUserComponent = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const router = useRouter();

	const path = usePathname();
	const params = useSearchParams();
	const type = params.get('type') || 'infor';

	const onSubmit = (data: User) => {
		dispatch(edittingUser({ ...data, _id: id as string }));
	};

	const onChangeTab = (value: string) => {
		const query = objectToQueryString({ type: value });
		router.replace(path + query);
	};

	useEffect(() => {
		if (id) {
			dispatch(gettingUser(id as string));
		}
	}, [dispatch, id]);

	return (
		<div>
			<Tabs
				activeKey={type || 'infor'}
				items={items}
				type='card'
				onChange={onChangeTab}
				className='mb-4'
			/>
			{type === 'infor' ? <UserForm onSubmit={onSubmit} /> : <FormChangePassword />}
		</div>
	);
};

export default AdminEditUserComponent;
