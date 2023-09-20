'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';

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
			<div className='px-32 h-screen mt-1'>{children}</div>
			<Footer />
		</div>
	);
};

export default MLayoutUser;
