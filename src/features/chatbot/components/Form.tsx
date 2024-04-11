import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSkeleton from '@/components/MSkeleton';
import { Intent } from '@/models/chatbotModel';
import { useAppSelector } from '@/redux/hooks';
import { getChatbotState } from '@/redux/reducers/chatbotReducer';
import { Form, Row } from 'antd';
import { useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import FormAddText from './FormAddText';

type ChatbotFormProps = {
	onSubmit?: (data: Intent) => void;
};

const INITIAL_VALUE: Intent = {
	intent: '',
	patterns: [],
	responses: [],
};

const ChatbotForm: React.FC<ChatbotFormProps> = (props) => {
	const chatbot = useAppSelector(getChatbotState);
	const { intentEdit } = chatbot;
	const router = useRouter();

	const { onSubmit } = props;
	const pathname = usePathname();
	const [form] = Form.useForm<Intent>();

	useEffect(() => {
		form.setFieldsValue(intentEdit ? { ...intentEdit } : { ...INITIAL_VALUE });
	}, [form, intentEdit]);

	useEffect(() => {
		if (chatbot.status === 'completed') {
			router.push('/chatbot/intents');
		}
	}, [chatbot.status, router]);

	return (
		<MSkeleton loading={chatbot.loading}>
			<Form
				onFinish={onSubmit}
				layout='vertical'
				form={form}
				onKeyDown={(e) => {
					e.key === 'Enter' && e.preventDefault();
				}}
			>
				<MRow gutter={8}>
					<MCol span={24}>
						<Form.Item
							name='intent'
							label='Intent'
							rules={[{ required: true }]}
						>
							<MInput size='large' />
						</Form.Item>
					</MCol>
					<MCol span={24}>
						<Form.Item
							name='patterns'
							label='Patterns'
							rules={[{ required: true }]}
						>
							<FormAddText
								name='patterns'
								form={form}
							/>
						</Form.Item>
					</MCol>
				</MRow>
				<MRow
					gutter={8}
					justify='end'
				>
					<MCol>
						<MButton
							type='primary'
							className='bg-gray-400'
							isGoBack
						>
							Back
						</MButton>
					</MCol>
					<MCol>
						<MButton
							type='primary'
							htmlType='submit'
						>
							{pathname.includes('create') ? 'Create' : 'Update'}
						</MButton>
					</MCol>
				</MRow>
			</Form>
		</MSkeleton>
	);
};

export default ChatbotForm;
