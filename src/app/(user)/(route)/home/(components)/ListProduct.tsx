import MSelect from '@/components/MSelect';
import React from 'react';
import CardProduct, { CardType } from './CardProduct';

interface ListProductProps {
	listProducts: CardType[];
}

const ListProduct: React.FC<ListProductProps> = ({ listProducts }) => {
	return (
		<div>
			<div className='flex justify-between h-14 p-2 items-center'>
				<h3 className='h-full text-center leading-10'> Gợi Ý Hôm Nay</h3>
				<MSelect
					defaultValue='default'
					style={{ width: 150 }}
					onChange={() => {}}
					options={[
						{ value: 'default', label: '(Default)' },
						{ value: 'increase', label: 'Giá tăng dần' },
						{ value: 'decrease', label: 'Giá giảm dần' },
						{ value: 'A-Z', label: 'Tên theo A-Z' },
						{ value: 'Z-A', label: 'Tên theo Z-A' },
					]}
				/>
			</div>
			<div className='grid grid-cols-6 w-full '>
				{listProducts.map((product, index) => {
					return (
						<CardProduct
							key={index}
							data={product}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ListProduct;
