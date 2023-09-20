import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const MLayoutUser = dynamic(() => import('@/layout/user/MLayout'), { ssr: false });

export const metadata: Metadata = {
	title: 'Home',
	description: 'Home page',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <MLayoutUser>{children}</MLayoutUser>;
}
