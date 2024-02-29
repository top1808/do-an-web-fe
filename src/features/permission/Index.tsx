'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MSkeleton from '@/components/MSkeleton';
import MSwitch from '@/components/MSwitch';
import { Permission, PermissionGroup, Role } from '@/models/roleModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingPermission, gettingRole, settingPermissionForRole } from '@/redux/reducers/roleReducer';
import React, { useEffect, useState } from 'react';

const PermissionPageComponent = () => {
	const dispatch = useAppDispatch();
	const { role: roleState } = useAppSelector((state) => state);

	const [permissionGroups, setPermisisonGroups] = useState<PermissionGroup[] | undefined>([]);

	const handleChangePermission = (role: Role, permisison: Permission, isChecked?: boolean) => {
		if (permisison.method === 'get' && isChecked) {
			const permissionsWithUrl = roleState?.permissions?.filter((p) => p.url === permisison.url && role.permissionIds?.includes(p._id as string));
			dispatch(settingPermissionForRole({ roleId: role._id, permissionIds: permissionsWithUrl?.map((p) => p._id) as string[] }));
		} else {
			dispatch(settingPermissionForRole({ roleId: role._id, permissionIds: [permisison._id] as string[] }));
		}
	};

	useEffect(() => {
		const tempPermissionGroups = roleState.permissions?.reduce((acc: PermissionGroup[], p: Permission) => {
			const findPermissionGroup = acc.find((item) => item.name === (p.url?.replace('/', '') === 'role' ? 'permission' : p.url?.replace('/', '')));
			if (findPermissionGroup) {
				acc = acc.map((item) => {
					if (item.name === findPermissionGroup.name) {
						return {
							...item,
							permissions: [
								...(item?.permissions || []),
								{
									...p,
									name: p.name?.split(' ')[0],
								},
							],
						};
					}
					return item;
				});
			} else {
				acc.push({
					name: p.url?.replace('/', ''),
					permissions: [
						{
							...p,
							name: p.name?.split(' ')[0],
						},
					],
				});
			}
			return acc;
		}, [] as PermissionGroup[]);
		setPermisisonGroups(tempPermissionGroups?.sort((a, b) => (a?.name || '').localeCompare(b?.name || '')));
	}, [roleState.permissions]);

	useEffect(() => {
		dispatch(gettingRole());
		dispatch(gettingPermission());
	}, [dispatch]);

	return (
		<MSkeleton loading={roleState.loading}>
			<MRow
				gutter={0}
				className='bg-slate-300 p-4 rounded-t'
			>
				<MCol span={6}>Permisisons</MCol>
				{roleState?.roles?.map((r) => (
					<MCol
						span={6}
						key={r._id}
						className='text-sm font-bold uppercase'
					>
						{r.name}
					</MCol>
				))}
			</MRow>
			{permissionGroups?.map((group) => (
				<MRow
					gutter={0}
					key={group.name}
					className='border border-slate-300 border-solid border-t-transparent bg-white p-4'
				>
					<MCol
						span={6}
						className='uppercase'
					>
						{group.name}
					</MCol>
					{roleState?.roles?.map((r) => (
						<MCol
							span={6}
							key={r._id}
							className='text-sm font-bold uppercase'
						>
							{group.permissions?.map((p) => (
								<div
									key={p._id}
									className='my-2'
								>
									<MSwitch
										checked={r.permissionIds?.includes(p._id as string)}
										checkedChildren={p.name}
										unCheckedChildren={p.name}
										loading={roleState.isChagingPermission}
										onChange={() => handleChangePermission(r, p, r.permissionIds?.includes(p._id as string))}
										style={{ width: 72 }}
									/>
								</div>
							))}
						</MCol>
					))}
				</MRow>
			))}
		</MSkeleton>
	);
};

export default PermissionPageComponent;
