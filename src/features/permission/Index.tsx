'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MSwitch from '@/components/MSwitch';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingPermission, gettingRole, settingPermissionForRole } from '@/redux/reducers/roleReducer';
import React, { useEffect } from 'react';

const PermissionPageComponent = () => {
	const dispatch = useAppDispatch();
	const { role } = useAppSelector((state) => state);

	useEffect(() => {
		dispatch(gettingRole());
		dispatch(gettingPermission());
	}, [dispatch]);

	return (
		<>
			<MRow
				gutter={0}
				className='bg-slate-300 p-4 rounded-t'
			>
				<MCol span={6}>Permisisons</MCol>
				{role?.roles?.map((r) => (
					<MCol
						span={3}
						key={r._id}
						className='text-sm font-bold uppercase'
					>
						{r.name}
					</MCol>
				))}
			</MRow>
			{role?.permissions?.map((p) => (
				<MRow
					gutter={0}
					key={p._id}
					className='border border-slate-300 border-solid border-t-transparent bg-white p-4'
				>
					<MCol
						span={6}
						className='uppercase'
					>
						{p.name}
					</MCol>
					{role?.roles?.map((r) => (
						<MCol
							span={3}
							key={r._id}
						>
							<MSwitch
								defaultChecked={r.permissionIds?.includes(p._id as string)}
								loading={role.loading}
								onChange={() => dispatch(settingPermissionForRole({ roleId: r._id, permissionId: p._id }))}
							/>
						</MCol>
					))}
				</MRow>
			))}
		</>
	);
};

export default PermissionPageComponent;
