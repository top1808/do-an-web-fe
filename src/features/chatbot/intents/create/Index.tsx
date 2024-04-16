'use client';
import { useAppDispatch } from '@/redux/hooks';
import React from 'react';
import { Intent } from '@/models/chatbotModel';
import { creatingIntents } from '@/redux/reducers/chatbotReducer';
import ChatbotForm from '../../components/Form';

const AdminCreateChatbotComponent = () => {
	const dispatch = useAppDispatch();

	const onSubmit = (data: Intent) => {
		dispatch(creatingIntents(data));
	};

	return (
		<div>
			<ChatbotForm onSubmit={onSubmit} />
		</div>
	);
};

export default AdminCreateChatbotComponent;
