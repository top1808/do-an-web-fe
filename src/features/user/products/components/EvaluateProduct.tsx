import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rate } from 'antd';
import React from 'react';
const data = [
	{
		name: 'Le top',
		rating: 4.5,
		date: '2023-09-21',
		content: 'san pham nay rat tot',
	},
	{
		name: 'Viet Thang',
		rating: 4,
		date: '2023-09-21',
		content: 'san pham nay nhu ccc',
	},
];
const EvaluateProduct = () => {
	return (
		<div className='shadow-xl mt-4'>
			<MTitle
				level={3}
				className='p-8'
				style={{ color: 'red' }}
			>
				Đánh giá sản phẩm
			</MTitle>
			<div className='p-4'>
				{data.map((item) => {
					return (
						<MRow
							key={item.name}
							gutter={12}
							className='py-4 px-2'
							style={{ borderTop: '1px solid rgb(200, 210, 227)' }}
						>
							<MCol>
								<div className='rounded-full bg-slate-200 p-3 text-center'>
									<FontAwesomeIcon
										icon={faUser}
										size='lg'
									/>
								</div>
							</MCol>
							<MCol>
								<MText
									style={{ fontSize: '1rem' }}
									className='font-bold'
								>
									{item.name}
								</MText>
								<br />

								<Rate
									disabled
									defaultValue={item.rating}
									allowHalf
								/>
								<br />
								<MText className='font-medium'>{item.date}</MText>
								<br />
								<MText>{item.content}</MText>
							</MCol>
						</MRow>
					);
				})}
			</div>
		</div>
	);
};

export default EvaluateProduct;
