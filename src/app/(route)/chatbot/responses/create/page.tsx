import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminCreateChatbotComponent from '@/features/chatbot/intents/create/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Create chatbot',
	description: 'Create chatbot',
};

const CreateChatbotPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/chatbot'>Chatbot</Link>,
		},
		{
			title: 'Create',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='Create chatbot'>
				<AdminCreateChatbotComponent />
			</MCard>
		</>
	);
};

export default CreateChatbotPage;
