import MImage from '@/components/MImage';
import MText from '@/components/MText';
import Link from 'next/link';
import React from 'react';
export interface CardType {
	id: string;
	name: string;
	image: string;
	price: number;
	isFlashSale: boolean;
}
interface CardProductProps {
	data: CardType;
}
const CardProduct: React.FC<CardProductProps> = ({ data }) => {
	return (
		<div className='h-64 px-1 w-full mt-2 card hover:opacity-70'>
			<Link href={`/products/${data.id}`}>
				<MImage
					src={data.image}
					alt={data.name}
					className='h-3/5 w-full'
					preview={false}
				/>
				<MText className='w-full pl-2'>{data.name}</MText>
				{data.isFlashSale && <div className='w-1/3 h-5 border-2 border-red-600 border-solid text-xs pl-2'>Flash sale</div>}
				<MText className='pl-2'>
					{data.price} <span>VNĐ</span>
				</MText>
			</Link>
		</div>
	);
};

export default CardProduct;
