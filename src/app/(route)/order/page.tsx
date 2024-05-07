import MBreadcrumb from '@/components/MBreadcrumb';
import MButton from '@/components/MButton';
import MCard from '@/components/MCard';
import MRow from '@/components/MRow';
import AdminOrderComponent from '@/features/order/Index';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Order',
	description: 'Order',
};

const OrderPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: 'Order',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard
				title={
					<MRow
						gutter={4}
						justify='end'
					>
						{/* <MButton
							type='primary'
							icon={<FontAwesomeIcon icon={faPlus} />}
							link='order/create'
						>
							Add New
						</MButton> */}
					</MRow>
				}
			>
				<AdminOrderComponent />
			</MCard>
		</>
	);
};

export default OrderPage;
