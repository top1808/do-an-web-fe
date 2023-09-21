import MTitle from '@/components/MTitle';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import CustomSteps from './(components)/CustomSteps';
import TableProducts, { InforItemCartProduct } from './(components)/TableProducts';
const fakeData: InforItemCartProduct[] = [
	{
		data: {
			id: '12312',
			image: 'http://runecom06.runtime.vn/Uploads/shop97/images/product/salad_thit_nuong_vi_large.jpg',
			isFlashSale: false,
			name: 'ga',
			price: 2000,
		},
		count: 2,
	},
	{
		data: {
			id: '3123123',
			image: 'http://runecom06.runtime.vn/Uploads/shop97/images/product/salad_thit_nuong_vi_large.jpg',
			isFlashSale: false,
			name: 'ga cc',
			price: 2000,
		},
		count: 2,
	},
];
const CartPage = () => {
	return (
		<div className='py-8'>
			<div>
				<Link
					href={'/home'}
					className='text-gray-400'
				>
					Home
				</Link>
				<span className='pl-1'>
					{/* <FontAwesomeIcon icon={faRightLong} /> */}
					<FontAwesomeIcon icon={faGreaterThan} />
					<FontAwesomeIcon icon={faGreaterThan} />
				</span>
				<span className='pl-1 text-red-600'>My cart</span>
			</div>
			<MTitle level={2}>My cart</MTitle>
			<div>
				<CustomSteps>
					<TableProducts data={fakeData} />
				</CustomSteps>
			</div>
		</div>
	);
};

export default CartPage;
