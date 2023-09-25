import MImage from '@/components/MImage';
import MText from '@/components/MText';
import { InforProduct } from '@/models/productModels';
import { customMoney } from '@/utils/FuntionHelpers';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
interface CardProductProps {
	data: InforProduct;
}
const CardProduct: React.FC<CardProductProps> = ({ data }) => {
	return (
		<Link href={`/products/${data.id}`}>
			<div className='shadow-xl p-2 border-blue-100 w-full  card hover:opacity-70'>
				<MImage
					src={data.image}
					alt={data.name}
					preview={false}
					style={{ height: '12rem' }}
				/>
				<div style={{ height: '2.4rem' }}>
					<MText className='text-xl'>{data.name}</MText>
				</div>
				<div
					style={{ height: '1.25rem' }}
					className='w-1/3 text-sm '
				>
					{data.isFlashSale && <MText>Flash sale</MText>}
				</div>

				<div
					style={{ height: '2.4rem' }}
					className='flex justify-between items-end'
				>
					<div>
						<MText className='text-lg'>{customMoney(data.price)}</MText>
					</div>
					<div>
						<MText className='text-md'>
							<FontAwesomeIcon
								icon={faHeart}
								color='red'
							/>
							&nbsp;
							{data.countHeart}
						</MText>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default CardProduct;
