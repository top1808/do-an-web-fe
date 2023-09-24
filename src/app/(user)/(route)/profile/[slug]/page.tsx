'use client';
import ProfileUserComponent from '@/features/user/profile/Index';
import ChangePass from '@/features/user/profile/components/ChangePass';
import Notice from '@/features/user/profile/components/Notice';
import Purchased from '@/features/user/profile/components/Purchased';
import { usePathname } from 'next/navigation';
import React from 'react';

const SlugProfileUser = () => {
	const path = usePathname();
	const currentPath = path.split('/')[2];
	switch (currentPath) {
		case 'notification':
			return (
				<ProfileUserComponent>
					<Notice data={[]} />
				</ProfileUserComponent>
			);
		case 'change-password':
			return (
				<ProfileUserComponent>
					<ChangePass />
				</ProfileUserComponent>
			);
		case 'purchased':
			return (
				<ProfileUserComponent>
					<Purchased />
				</ProfileUserComponent>
			);
		default:
			return <div>Not found</div>;
	}
};

export default SlugProfileUser;
