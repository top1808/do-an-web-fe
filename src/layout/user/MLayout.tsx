'use client';

import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
const { Header: AntHeader, Footer: AntFooter, Content } = Layout;

interface LayoutProps {
	children?: React.ReactNode;
}

const MLayoutUser: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className='w-full '>
			<div className='sticky top-0'>
				<Header />
				<Menu />
			</div>
			<div className='p-8 h-screen'>{children}</div>
			<Footer />
		</div>
	);
};

export default MLayoutUser;
