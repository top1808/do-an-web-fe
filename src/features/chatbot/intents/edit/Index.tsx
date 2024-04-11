'use client';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Intent } from '@/models/chatbotModel';
import { edittingIntent, gettingIntent } from '@/redux/reducers/chatbotReducer';
import ChatbotForm from '../../components/Form';

const AdminEditChatbotComponent = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const onSubmit = (data: Intent) => {
		dispatch(
			edittingIntent({
				...data,
				_id: id as string,
			}),
		);
	};

	useEffect(() => {
		if (id) {
			dispatch(gettingIntent(id as string));
		}
	}, [dispatch, id]);

	return (
		<div>
			<ChatbotForm onSubmit={onSubmit} />
		</div>
	);
};

export default AdminEditChatbotComponent;
