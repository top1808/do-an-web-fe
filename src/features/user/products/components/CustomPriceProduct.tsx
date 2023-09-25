import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
import { customMoney } from '@/utils/FuntionHelpers';
import React from 'react';
import EvaluateProduct from './EvaluateProduct';

const CustomPriceProduct = ({ price, sales }: { price: number; sales: number }) => {
	return (
		<div className='shadow-md bg-slate-100 p-2 '>
			<MRow
				gutter={16}
				align={'middle'}
			>
				<MCol>
					<MTitle
						level={3}
						className='line-through'
					>
						{customMoney(price)}
					</MTitle>
				</MCol>
				<MCol>
					<MTitle level={2}>{customMoney((price * (100 - sales)) / 100)}</MTitle>
				</MCol>
				<MCol>
					<MText className='text-white p-2 bg-red-400 rounded-md'>{`Sale ${sales}%`}</MText>
				</MCol>
			</MRow>
		</div>
	);
};

export default CustomPriceProduct;
