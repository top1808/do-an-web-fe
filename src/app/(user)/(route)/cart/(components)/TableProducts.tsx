'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import React from 'react';
import { CardType } from '../../home/(components)/CardProduct';
import MButton from '@/components/MButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import MImage from '@/components/MImage';
export interface InforItemCartProduct {
	data: CardType;
	count: number;
}
const TableProducts = ({ data }: { data: InforItemCartProduct[] }) => {
	return (
		<>
			<MRow className='bg-gray-400 py-2 px-1'>
				<MCol
					className='text-center'
					span={4}
				></MCol>
				<MCol
					className='text-center'
					span={6}
				>
					<MText>Tên sản phẩm</MText>
				</MCol>
				<MCol
					className='text-center'
					span={3}
				>
					<MText>Giá</MText>
				</MCol>
				<MCol
					className='text-center'
					span={3}
				>
					<MText>Số lượng</MText>
				</MCol>
				<MCol
					className='text-center'
					span={6}
				>
					<MText>Thành tiền</MText>
				</MCol>
				<MCol
					className='text-center'
					span={2}
				></MCol>
			</MRow>
			{data.map((item: InforItemCartProduct, index: number) => {
				return (
					<MRow
						key={index}
						align={'middle'}
						style={{ borderBottom: ' 1px solid black' }}
					>
						<MCol
							className='text-center py-2'
							span={4}
						>
							<MImage
								preview={false}
								src={item.data.image}
								alt={`${item.data.name} image`}
								height={60}
							/>
						</MCol>
						<MCol
							span={6}
							className='text-center'
						>
							<MText>{item.data.name}</MText>
						</MCol>
						<MCol
							className='text-center'
							span={3}
						>
							<MText>{item.data.price}</MText>
						</MCol>
						<MCol
							className='text-center'
							span={3}
						>
							<MText>{item.count}</MText>
						</MCol>
						<MCol
							className='text-center'
							span={6}
						>
							<MText>{item.data.price * item.count}</MText>
						</MCol>
						<MCol span={2}>
							<MButton className='border-none'>
								<FontAwesomeIcon
									color='red'
									icon={faTrash}
								/>
							</MButton>
						</MCol>
					</MRow>
				);
			})}
		</>
	);
};

export default TableProducts;
