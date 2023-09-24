import MLayoutUser from '@/layout/user/MLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'App',
	description: 'App',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return <MLayoutUser>{children}</MLayoutUser>;
}
