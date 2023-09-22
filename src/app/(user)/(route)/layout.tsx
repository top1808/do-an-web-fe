import SideBarUser from '@/layout/user/SidebarUser';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const MLayoutUser = dynamic(() => import('@/layout/user/MLayout'), { ssr: false });

export const metadata: Metadata = {
	title: 'Home',
	description: 'Home page',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<MLayoutUser>
			<div className='flex w-full'>
				<div className='w-1/6'>
					<SideBarUser />
				</div>
				<div className='w-5/6'>{children}</div>
			</div>
		</MLayoutUser>
	);
}
