'use client';
import MButton from '@/components/MButton';
import { faCartShopping, faCheck, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Steps, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
const items = [
	{
		title: 'Giỏ hàng của tôi',
		icon: (
			<FontAwesomeIcon
				color='red'
				icon={faCartShopping}
			/>
		),
	},
	{
		title: 'Thanh toán',
		icon: (
			<FontAwesomeIcon
				color='red'
				icon={faDollarSign}
			/>
		),
	},
	{
		title: 'Hoàn tất thanh toán',
		icon: (
			<FontAwesomeIcon
				color='red'
				icon={faCheck}
			/>
		),
	},
];
interface ChildrenProps {
	children: React.ReactNode;
}
const CustomSteps: React.FC<ChildrenProps> = ({ children }) => {
	const [current, setCurrent] = useState(0);
	const router = useRouter();
	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	return (
		<>
			<Steps
				current={current}
				items={items}
			>
				{items.map((item) => (
					<Steps.Step
						key={item.title}
						title={item.title}
						className='bg-red-600'
					/>
				))}
			</Steps>

			{current === 0 ? <div>{children}</div> : <></>}
			<div className='mt-6 flex justify-end'>
				<MButton
					className='mr-2 bg-red-400 text-white'
					onClick={() => {
						router.push('/home');
					}}
				>
					Tiếp tục mua sắm
				</MButton>
				{current < items.length - 1 && (
					<MButton
						type='primary'
						onClick={() => next()}
					>
						Next
					</MButton>
				)}
				{current === items.length - 1 && (
					<MButton
						type='primary'
						onClick={() => message.success('Processing complete!')}
					>
						Done
					</MButton>
				)}
				{current > 0 && (
					<MButton
						style={{ margin: '0 8px' }}
						onClick={() => prev()}
					>
						Previous
					</MButton>
				)}
			</div>
		</>
	);
};

export default CustomSteps;
