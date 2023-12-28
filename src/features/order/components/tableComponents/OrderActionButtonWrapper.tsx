import MButton from '@/components/MButton';
import MButtonDelete from '@/components/MButtonDelete';
import MPopconfirm from '@/components/MPopconfirm';
import MSpace from '@/components/MSpace';
import { Order } from '@/models/orderModel';
import { useAppDispatch } from '@/redux/hooks';
import { toggleModalTransport } from '@/redux/reducers/modalReducer';
import { changingStatusOrder, deletingOrder } from '@/redux/reducers/orderReducer';
import { faBan, faCheck, faCheckToSlot, faEdit, faEye, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Swal from 'sweetalert2';

interface OrderActionButtonWrapperProps {
	item?: Order;
}

const OrderActionButtonWrapper = (props: OrderActionButtonWrapperProps) => {
	const { item } = props;
	const dispatch = useAppDispatch();

	const onCancelOrder = () => {
		Swal.fire({
			title: 'Cancel Order',
			text: 'Are you sure to cancel order ' + item?.orderCode + '?',
			input: 'textarea',
			inputLabel: 'Reason',
			showCancelButton: true,
			reverseButtons: true,
			confirmButtonText: 'Submit',
			cancelButtonText: 'Close',
		}).then((res) => {
			if (res.isConfirmed) {
				dispatch(changingStatusOrder({ id: item?._id || '', status: 'canceled', reason: res.value }));
			}
		});
	};

	return (
		<MSpace split={''}>
			<MButton
				tooltip='View order'
				link={`order/view/${item?._id}`}
				className='text-white bg-purple-600 hover:bg-purple-300'
			>
				<FontAwesomeIcon icon={faEye} />
			</MButton>
			{item?.status === 'delivering' && (
				<MPopconfirm
					title={`Confirm delivered order ${item?.orderCode}`}
					description='Are you sure to confirm delivered?'
					onConfirm={() => dispatch(changingStatusOrder({ id: item?._id || '', status: 'delivered' }))}
					okText='Yes'
					cancelText='No'
					placement='bottom'
				>
					<MButton
						tooltip='Confirm delivered order'
						className='text-white bg-orange-500 hover:bg-orange-300'
					>
						<FontAwesomeIcon icon={faCheckToSlot} />
					</MButton>
				</MPopconfirm>
			)}
			{item?.status === 'confirmed' && (
				<MButton
					tooltip='Transport order'
					className='text-white bg-yellow-500 hover:bg-yellow-300'
					onClick={() => dispatch(toggleModalTransport(item))}
				>
					<FontAwesomeIcon icon={faTruck} />
				</MButton>
			)}
			{item?.status === 'processing' && (
				<MPopconfirm
					title={`Confirm order ${item?.orderCode}`}
					description='Are you sure to confirm?'
					onConfirm={() => dispatch(changingStatusOrder({ id: item?._id || '', status: 'confirmed' }))}
					okText='Yes'
					cancelText='No'
					placement='bottom'
				>
					<MButton
						tooltip='Confirm order'
						className='text-white bg-green-600 hover:bg-green-300'
					>
						<FontAwesomeIcon icon={faCheck} />
					</MButton>
				</MPopconfirm>
			)}
			{item?.status !== 'delivered' && item?.status !== 'received' && item?.status !== 'canceled' && (
				<MButton
					tooltip='Cancel order'
					className='text-white bg-red-600 hover:bg-red-400'
					onClick={onCancelOrder}
				>
					<FontAwesomeIcon icon={faBan} />
				</MButton>
			)}
			{item?.status === 'processing' ||
				(item?.status === 'confirmed' && (
					<MButton
						tooltip='Edit order'
						type='primary'
						link={`order/edit/${item?._id}`}
					>
						<FontAwesomeIcon icon={faEdit} />
					</MButton>
				))}
			{item?.status === 'canceled' && (
				<MButtonDelete
					title={`Delete order ${item?.orderCode}? `}
					onConfirm={() => dispatch(deletingOrder(item?._id || ''))}
				></MButtonDelete>
			)}
		</MSpace>
	);
};

export default OrderActionButtonWrapper;
