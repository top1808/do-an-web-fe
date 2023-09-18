import '../../../styles/globals.css';
import StyledComponentsRegistry from '../../../lib/AntdRegistry';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/redux/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login admin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body
				className={inter.className}
				style={{ overflow: 'hidden', maxHeight: '100vh' }}
			>
				<StyledComponentsRegistry>
					<Providers>
						<div className='h-screen  flex justify-center items-center layout-login'>{children}</div>;
					</Providers>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
