'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import React from 'react';
import MButton from '@/components/MButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import MImage from '@/components/MImage';
import MTitle from '@/components/MTitle';
import MInput from '@/components/MInput';
import { InforProduct } from '@/models/productModels';
import { customMoney } from '@/utils/FuntionHelpers';
import { InputNumber } from 'antd';
export interface ListCartProductProps {
	data: InforProduct;
	count: number;
}
const TableCartProducts = ({ data }: { data: ListCartProductProps[] }) => {
	const sum = (data: ListCartProductProps[]) => {
		let temp = 0;
		data.forEach((element) => {
			temp += element.count * element.data.price;
		});
		return temp;
	};
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
					className='text-end'
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
					className='text-end'
					span={6}
				>
					<MText>Thành tiền</MText>
				</MCol>
				<MCol
					className='text-center'
					span={2}
				></MCol>
			</MRow>
			{data.map((item, index: number) => {
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
							className='text-end'
							span={3}
						>
							<MText>{`${customMoney(item.data.price)}`}</MText>
						</MCol>
						<MCol
							className='text-center'
							span={3}
						>
							<InputNumber
								defaultValue={item.count}
								min={1}
								max={999}
							/>
						</MCol>
						<MCol
							className='text-end'
							span={6}
						>
							<MText>{`${customMoney(item.data.price * item.count)}`}</MText>
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

			<MTitle
				level={3}
				className='text-end pr-2'
			>
				{`Tổng tiền: ${customMoney(sum(data))}`}
			</MTitle>
		</>
	);
};

export default TableCartProducts;
