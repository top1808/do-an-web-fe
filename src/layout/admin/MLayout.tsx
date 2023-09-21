'use client';

import React from 'react';
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import { Layout } from 'antd';
import SideBar from './SideBar';
import { useAppSelector } from '../../redux/hooks';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const { Header, Footer, Sider, Content } = Layout;

interface LayoutProps {
	children?: React.ReactNode;
}

const MLayout: React.FC<LayoutProps> = ({ children }) => {
	const { sideBar } = useAppSelector((state) => state);
	const router = useRouter();

	const session = useSession({
		required: true,
		onUnauthenticated: () => {
			router.push('/admin/login');
		},
	});

	return (
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
				<Content style={{ marginTop: 100 }}>{session.status === 'authenticated' && children}</Content>
				<Footer>
					<FooterComponent />
				</Footer>
			</Layout>
		</Layout>
	);
};

export default MLayout;
