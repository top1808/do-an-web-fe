import MSelect from '@/components/MSelect';
import React from 'react';
import CardProduct from './CardProduct';
import { InforProduct } from '@/models/productModels';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';

interface ListProductProps {
	listProducts: InforProduct[];
}

const ListProducts: React.FC<ListProductProps> = ({ listProducts }) => {
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
			<MRow gutter={16}>
				{listProducts.map((product, index) => {
					return (
						<MCol
							key={index}
							xs={8}
							sm={6}
							md={6}
							lg={4}
							xl={4}
						>
							<CardProduct data={product} />
						</MCol>
					);
				})}
			</MRow>
		</div>
	);
};

export default ListProducts;
