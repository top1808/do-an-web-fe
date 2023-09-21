import '../styles/globals.css';
import StyledComponentsRegistry from '../lib/AntdRegistry';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/redux/provider';
import { getServerSession } from 'next-auth';
import SessionProvider from '../utils/SessionProvider';
import { options } from './api/auth/[...nextauth]/options';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'App',
	description: 'App',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(options);

	return (
		<html lang='en'>
			<body className={inter.className}>
				<SessionProvider session={session}>
					<StyledComponentsRegistry>
						<Providers>
							<div>{children}</div>
							<ToastContainer />
						</Providers>
					</StyledComponentsRegistry>
				</SessionProvider>
			</body>
		</html>
	);
}
