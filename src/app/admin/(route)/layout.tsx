import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const MLayout = dynamic(() => import('@/layout/admin/MLayout'), { ssr: false });

export const metadata: Metadata = {
	title: 'Admin',
	description: 'Admin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<MLayout>
			<div className='p-12'>{children}</div>
		</MLayout>
	);
}
