'use client';
import React from 'react';
import SideBarProfile from './components/SideBarProfile';
import InforUser from './components/InforUser';
import Purchased from './components/Purchased';
import Notice from './components/Notice';
import ChangePass from './components/ChangePass';

const ProfileUserComponent = () => {
	return (
		<div className='w-4/5 mx-auto my-10'>
			<div className='flex'>
				<SideBarProfile />
				<div className='w-3/4 pl-4'>
					<InforUser data={{ username: 'string', name: 'thang123', email: 'string@@', id: '123123', phone: '123123' }} />
					<Notice data={[]} />
					<ChangePass />
					<Purchased />
				</div>
			</div>
		</div>
	);
};

export default ProfileUserComponent;
