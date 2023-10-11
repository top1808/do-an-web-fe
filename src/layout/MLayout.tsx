'use client';

import React, { useEffect } from 'react';
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import { Layout } from 'antd';
import SideBar from './SideBar';
import { useAppSelector } from '../redux/hooks';
import { useRouter } from 'next/navigation';

const { Header, Footer, Sider, Content } = Layout;

interface LayoutProps {
	children?: React.ReactNode;
}

const MLayout: React.FC<LayoutProps> = ({ children }) => {
	const { sideBar, auth } = useAppSelector((state) => state);
	const router = useRouter();

	useEffect(() => {
		if (!auth.isLoggedIn) {
			router.push('/login');
		}
	}, [auth, router]);

	return !auth.isLoggedIn ? (
		<></>
	) : (
		<Layout>
			<Sider
				theme='light'
				trigger={null}
				collapsible
				style={{
					overflow: 'auto',
					position: 'fixed',
					left: 0,
					bottom: 0,
					top: 0,
					zIndex: 2,
				}}
				collapsed={!sideBar?.isOpen}
			>
				<SideBar />
			</Sider>
			<Layout
				className='site-layout'
				style={{ paddingLeft: sideBar?.isOpen ? 200 : 80, transitionDuration: '0.3s' }}
			>
				<Header
					style={{
						background: '#1EAAE7',
						padding: '12px 32px',
						height: 100,
						position: 'fixed',
						top: 0,
						left: sideBar?.isOpen ? 200 : 80,
						right: 0,
						zIndex: 1,
						transitionDuration: '0.3s',
					}}
				>
					<HeaderComponent />
				</Header>
				<Content style={{ marginTop: 100 }}>{children}</Content>
				<Footer>
					<FooterComponent />
				</Footer>
			</Layout>
		</Layout>
	);
};

export default MLayout;
