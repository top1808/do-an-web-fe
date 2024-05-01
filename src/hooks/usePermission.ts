import { routes } from '@/layout/SideBar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { checkingPermission, getRoleState } from '@/redux/reducers/roleReducer';
import { useEffect } from 'react';

const usePermission = () => {
	const role = useAppSelector(getRoleState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		routes.forEach((route) => {
			dispatch(checkingPermission(route?.key as string));
		});
	}, [dispatch, role.roles]);

	return role.webPermissions;
};

export default usePermission;
