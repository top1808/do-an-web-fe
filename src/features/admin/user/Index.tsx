import { User } from '@/models/userModel';
import { useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import UserTable from './components/Table';

const AdminUserComponent = () => {
	return (
		<div>
			<UserTable />
		</div>
	);
};

export default AdminUserComponent;
