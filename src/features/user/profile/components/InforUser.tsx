import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import { User } from '@/models/userModel';
import React from 'react';

const InforUser = ({ data }: { data: User }) => {
	return (
		<>
			<h3>Thông tin tài khoản</h3>
			<MRow
				justify={'start'}
				align={'middle'}
				className=' hover:bg-slate-400 font-bold pl-2 py-2  '
			>
				<MCol span={8}>ID:</MCol>
				<MCol span={8}>{data.id}</MCol>
			</MRow>
			<MRow
				justify={'start'}
				align={'middle'}
				className='h-8 hover:bg-slate-400 font-bold pl-2 py-2	'
			>
				<MCol span={8}>User name:</MCol>
				<MCol span={8}>{data.username}</MCol>
			</MRow>
			<MRow
				justify={'start'}
				align={'middle'}
				className='h-8 hover:bg-slate-400 font-bold pl-2 py-2'
			>
				<MCol span={8}>Name:</MCol>
				<MCol span={8}>{data.name}</MCol>
			</MRow>
			<MRow
				justify={'start'}
				align={'middle'}
				className='h-8 hover:bg-slate-400 font-bold pl-2 py-2  '
			>
				<MCol span={8}>Phone:</MCol>
				<MCol span={8}>{data.phone}</MCol>
			</MRow>
			<MRow
				justify={'start'}
				align={'middle'}
				className='h-8 hover:bg-slate-400 font-bold pl-2 py-2  '
			>
				<MCol span={8}>Email:</MCol>
				<MCol span={8}>{data.email}</MCol>
			</MRow>
		</>
	);
};

export default InforUser;
