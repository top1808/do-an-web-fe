import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login admin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <div className='h-screen  flex justify-center items-center layout-login'>{children}</div>;
}
