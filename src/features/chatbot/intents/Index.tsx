'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import MSkeleton from '@/components/MSkeleton';
import { getChatbotState, gettingIntents } from '@/redux/reducers/chatbotReducer';
import MButton from '@/components/MButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const AdminChatbotComponent = () => {
	const chatbot = useAppSelector(getChatbotState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(gettingIntents());
	}, [dispatch]);

	return (
		<MSkeleton loading={chatbot.loading}>
			{chatbot?.data?.map((item) => (
				<div
					key={item._id}
					className='flex justify-between items-center border border-gray-300 border-solid rounded p-4 my-2 shadow-md bg-gray-100'
				>
					{item.intent?.toUpperCase()}
					<MButton
						type='primary'
						link={`intents/edit/${item._id}`}
					>
						<FontAwesomeIcon icon={faEdit} />
					</MButton>
				</div>
			))}
		</MSkeleton>
	);
};

export default AdminChatbotComponent;
