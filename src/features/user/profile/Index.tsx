'use client';
import React from 'react';
import SideBarProfile from './components/SideBarProfile';

const ProfileUserComponent = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='w-4/5 mx-auto my-10'>
			<div className='flex'>
				<SideBarProfile />
				<div className='w-3/4 pl-4'>{children}</div>
			</div>
		</div>
	);
};

export default ProfileUserComponent;
