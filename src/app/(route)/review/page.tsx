import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminReviewComponent from '@/features/review/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Review',
	description: 'Review',
};

const ReviewPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: 'Review',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard>
				<AdminReviewComponent />
			</MCard>
		</>
	);
};

export default ReviewPage;
