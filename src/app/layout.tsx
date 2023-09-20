import '../styles/globals.css';
import StyledComponentsRegistry from '../lib/AntdRegistry';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/redux/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'App',
	description: 'App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<StyledComponentsRegistry>
					<Providers>
						<div>{children}</div>;
					</Providers>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
