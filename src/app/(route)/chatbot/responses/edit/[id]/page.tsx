import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminEditChatbotComponent from '@/features/chatbot/intents/edit/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Edit chatbot',
	description: 'Edit chatbot',
};

const ChatbotEditPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/chatbot'>Chatbot</Link>,
		},
		{
			title: 'Edit',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='Edit chatbot'>
				<AdminEditChatbotComponent />
			</MCard>
		</>
	);
};

export default ChatbotEditPage;
