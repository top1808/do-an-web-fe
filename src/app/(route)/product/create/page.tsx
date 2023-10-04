import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import CreateProductComponent from '@/features/product/create/Index';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Create product',
	description: 'Create product',
};

const CreateProduct = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/product'>Product</Link>,
		},
		{
			title: 'Create',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='Create User'>
				<CreateProductComponent />
			</MCard>
		</>
	);
};

export default CreateProduct;
