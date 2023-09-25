'use client';

import MTitle from '@/components/MTitle';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';
import CustomSteps from './components/StepsPayment';
import TableCartProducts, { ListCartProductProps } from './components/TableCartProducts';
import MPagination from '@/components/MPagination';

const fakeData: ListCartProductProps[] = [
	{
		data: {
			id: '12312',
			image: 'http://runecom06.runtime.vn/Uploads/shop97/images/product/salad_thit_nuong_vi_large.jpg',
			isFlashSale: false,
			name: 'ga',
			price: 2000000,
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
		count: 5,
	},
];
const CartPageComponent = () => {
	const [pageCurrent, setPageCurrent] = useState(1);
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
					<FontAwesomeIcon icon={faGreaterThan} />
					<FontAwesomeIcon icon={faGreaterThan} />
				</span>
				<span className='pl-1 text-red-600'>My cart</span>
			</div>
			<MTitle level={2}>My cart</MTitle>
			<div>
				<CustomSteps>
					<TableCartProducts data={fakeData} />
					<div className='text-center mt-2'>
						<MPagination
							defaultCurrent={1}
							current={pageCurrent}
							total={fakeData ? fakeData.length : 0}
							pageSize={10}
							onChange={(page) => {
								window.scrollTo(0, 0);
								setPageCurrent(page);
							}}
						/>
					</div>
				</CustomSteps>
			</div>
		</div>
	);
};

export default CartPageComponent;
