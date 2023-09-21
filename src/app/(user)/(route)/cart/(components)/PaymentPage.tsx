import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MTitle from '@/components/MTitle';
import React from 'react';

const PaymentPage = () => {
	return (
		<MRow justify={'space-between'}>
			<MCol span={7}>
				<MTitle level={3}>1.Thông tin nhận hàng</MTitle>
				<div>
					<h3>Thông tin thanh toán</h3>
				</div>
			</MCol>
			<MCol span={7}></MCol>
			<MCol span={7}></MCol>
		</MRow>
	);
};

export default PaymentPage;
