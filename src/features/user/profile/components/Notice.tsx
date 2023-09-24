import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MTitle from '@/components/MTitle';
import React from 'react';
interface NoticeProps {
	id: string;
	content: string;
	time: string;
	from: string;
}
const Notice = ({ data }: { data: NoticeProps[] }) => {
	return (
		<div>
			<MTitle level={3}>Thông báo</MTitle>
			<MRow
				align={'middle'}
				className='py-2 bg-slate-500 text-white'
			>
				<MCol
					className='px-2'
					span={4}
				>
					#ID
				</MCol>
				<MCol span={12}>#Nội dung</MCol>
				<MCol span={4}>#Người đăng</MCol>
				<MCol span={4}>#Thời gian</MCol>
			</MRow>
			{data &&
				data.map((item) => {
					return (
						<>
							<MRow>
								<MCol span={4}>{item.id}</MCol>
								<MCol span={12}>{item.content}</MCol>
								<MCol span={4}>{item.from}</MCol>
								<MCol span={4}>{item.time}</MCol>
							</MRow>
						</>
					);
				})}
			{!data ||
				(data.length < 1 && (
					<MRow justify={'center'}>
						<MCol>No data available in table</MCol>
					</MRow>
				))}
		</div>
	);
};

export default Notice;
