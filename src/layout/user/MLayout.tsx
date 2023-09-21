'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import { FloatButton } from 'antd';

interface LayoutProps {
	children?: React.ReactNode;
}

const MLayoutUser: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className='w-full '>
			<div className='sticky top-0 z-10'>
				<Header />
				<Menu />
			</div>
			<div className='px-32 min-h-screen mt-1'>{children}</div>
			<Footer />
			<FloatButton.BackTop type='primary' />
		</div>
	);
};

export default MLayoutUser;
