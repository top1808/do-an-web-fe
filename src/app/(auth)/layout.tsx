import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login admin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className='layout-login' />
			<div
				className='flex justify-center items-center'
				style={{ height: 'calc(100vh - 20px)' }}
			>
				{children}
			</div>
		</>
	);
}
