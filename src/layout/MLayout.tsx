'use client';

import React, { Suspense, useEffect } from 'react';
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import { FloatButton, Layout } from 'antd';
import SideBar from './SideBar';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useRouter } from 'next-nprogress-bar';
import MSpin from '@/components/MSpin';
import { getMessagingToken, registerServiceWorker } from '@/lib/firebase';
import { onGetPusherNotification } from '@/lib/pusher';
import { getAuthState } from '@/redux/reducers/authReducer';
import { getSideBarState } from '@/redux/reducers/sideBarReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import MChatComponent from '@/components/MChatComponent';
import { toggleChat } from '@/redux/reducers/modalReducer';
import { clearAllChat } from '@/redux/reducers/chatbotReducer';

const { Header, Footer, Sider, Content } = Layout;

interface LayoutProps {
	children?: React.ReactNode;
}

const MLayout: React.FC<LayoutProps> = ({ children }) => {
	const auth = useAppSelector(getAuthState);
	const sideBar = useAppSelector(getSideBarState);

	const dispatch = useAppDispatch();

	const router = useRouter();

	useEffect(() => {
		if (!auth.isLoggedIn) {
			window.location.assign('/login');
			dispatch(clearAllChat());
		}
	}, [auth, dispatch, router]);

	useEffect(() => {
		registerServiceWorker();
		getMessagingToken();
		onGetPusherNotification();
	}, []);

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
						zIndex: 10,
						transitionDuration: '0.3s',
					}}
				>
					<HeaderComponent />
				</Header>
				<Content style={{ marginTop: 100, minHeight: 'calc(100vh - 180px)' }}>
					<Suspense
						fallback={
							<div className='w-full h-full flex items-center justify-center'>
								<MSpin size='large'></MSpin>
							</div>
						}
					>
						{children}
						{/* <FloatButton
							shape='circle'
							type='primary'
							icon={<FontAwesomeIcon icon={faMessage} />}
							style={{ width: 60, height: 60 }}
							onClick={() => dispatch(toggleChat())}
						/>
						<MChatComponent /> */}
					</Suspense>
					<FloatButton.BackTop type='primary' />
				</Content>
				<Footer>
					<FooterComponent />
				</Footer>
			</Layout>
		</Layout>
	);
};

export default MLayout;
