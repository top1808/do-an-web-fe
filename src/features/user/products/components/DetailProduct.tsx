'use client';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
import { customMoney } from '@/utils/FuntionHelpers';
import { faCartShopping, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Image, InputNumber, Rate } from 'antd';
import React from 'react';
import CustomPriceProduct from './CustomPriceProduct';
import EvaluateProduct from './EvaluateProduct';
const data = {
	id: '11241123',
	name: 'Banh trung thu 2 trung',
	price: 10000000,
	decription: 'Mỳ Ý sốt cà chua hương vị ngon, thưởng thức rất hợp khẩu vị. Món ăn không gây béo mà hương vị lại đầy đủ, rất dễ ăn',
	image: 'http://runecom06.runtime.vn/Uploads/shop97/images/product/my_xao_thap_cam_large.jpg',
	rating: 4.5,
	countSales: 80,
};
const DetailProductComponent = () => {
	return (
		<>
			<div className='p-8 shadow-xl'>
				<MRow gutter={12}>
					<MCol span={8}>
						<Image
							src={data.image}
							alt={data.name}
						/>
					</MCol>
					<MCol span={16}>
						<MTitle>{data.name}</MTitle>
						<MRow>
							<MCol className='flex items-center'>
								<MTitle level={4}>{data.rating}</MTitle>
								<Rate
									disabled
									defaultValue={data.rating}
								/>
							</MCol>
						</MRow>
						<CustomPriceProduct
							price={data.price}
							sales={data.countSales}
						/>
						<MTitle>{`Mã sản phẩm: #${data.id}`}</MTitle>
						<MText>{data.decription}</MText>
						<Form>
							<Form.Item name={'count'}>
								<MTitle>Số lượng</MTitle>
								<InputNumber
									min={1}
									max={999}
									defaultValue={1}
								/>
							</Form.Item>
							<div className='flex gap-4'>
								<MButton className='bg-black text-white'>
									<FontAwesomeIcon icon={faCartShopping} />
									&nbsp; Thêm vào giỏ hàng
								</MButton>
								<MButton
									htmlType='submit'
									className='bg-red-400 text-white'
								>
									<FontAwesomeIcon icon={faCheck} />
									&nbsp; Mua ngay
								</MButton>
							</div>
						</Form>
					</MCol>
				</MRow>
			</div>
			<EvaluateProduct />
		</>
	);
};

export default DetailProductComponent;
