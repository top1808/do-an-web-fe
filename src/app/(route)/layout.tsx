import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const MLayout = dynamic(() => import('@/layout/MLayout'), { ssr: false });

export const metadata: Metadata = {
	title: 'Admin',
	description: 'Admin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<MLayout>
			<div className='px-12 py-4'>{children}</div>
		</MLayout>
	);
}
