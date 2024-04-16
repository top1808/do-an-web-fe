import { faClose, faPaperPlane, faRobot, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input, InputRef } from 'antd';
import React, { useEffect, useRef } from 'react';
import MButton from './MButton';
import MRow from './MRow';
import MCol from './MCol';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getModalState, toggleChat } from '@/redux/reducers/modalReducer';
import { chatting, getChatbotState } from '@/redux/reducers/chatbotReducer';
import MLoadingThreeDot from './MLoadingThreeDot';

const MChatComponent = () => {
	const modal = useAppSelector(getModalState);
	const chatbot = useAppSelector(getChatbotState);

	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const handlePressKey = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			form.submit();
		}
	};
	const onSubmit = (data: { message: string }) => {
		form.setFieldValue('message', '');
		dispatch(chatting(data?.message?.slice(0, data?.message?.length - 1)));
	};

	useEffect(() => {
		const elem = document.getElementById('chat_component');
		if (elem) {
			elem.scrollTop = elem?.scrollHeight;
		}
	}, [chatbot.botResponses, chatbot.myMessage, modal.isOpenChat]);

	if (!modal?.isOpenChat) return <></>;
	return (
		<div className='max-w-full w-96 h-[30rem] fixed bottom-0 right-40 rounded overflow-hidden flex flex-col z-10 shadow'>
			<div className='flex justify-end items-center bg-blue-500 p-4'>
				<FontAwesomeIcon
					icon={faClose}
					size='xl'
					className='text-white hover:opacity-60 cursor-pointer'
					onClick={() => dispatch(toggleChat())}
				/>
			</div>
			<div
				className='bg-white p-2 h-full overflow-auto text-base'
				id='chat_component'
			>
				{Array.from(Array(chatbot.myMessage?.length))?.map((_, i) => (
					<div key={i}>
						<div className='flex gap-2 items-center justify-end mt-2'>
							<div className='bg-orange-500 rounded-xl p-2 px-4 text-white'>{chatbot.myMessage?.[i]}</div>
							<FontAwesomeIcon icon={faUser} />
						</div>
						<div className='flex gap-2 items-center mt-2'>
							<FontAwesomeIcon icon={faRobot} />
							<div className='bg-blue-500 rounded-xl p-2 px-4 text-white'>{chatbot.isChatting && i === (chatbot.myMessage?.length || 0) - 1 ? <MLoadingThreeDot /> : chatbot.botResponses?.[i]}</div>
						</div>
					</div>
				))}
			</div>

			<Form
				form={form}
				onFinish={onSubmit}
				className='bg-white border border-solid border-transparent border-t-gray-400 p-2'
				layout='horizontal'
			>
				<MRow
					align='middle'
					justify='center'
					gutter={12}
				>
					<MCol xs={21}>
						<Form.Item
							name='message'
							className='m-0'
						>
							<Input.TextArea
								onKeyUp={handlePressKey}
								style={{ resize: 'none' }}
								autoFocus
							/>
						</Form.Item>
					</MCol>
					<MCol xs={3}>
						<MButton
							type='primary'
							icon={
								<FontAwesomeIcon
									icon={faPaperPlane}
									className='text-white'
								/>
							}
							onClick={() => form.submit()}
						/>
					</MCol>
				</MRow>
			</Form>
		</div>
	);
};

export default MChatComponent;
