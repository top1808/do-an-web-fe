import { routes } from '@/layout/SideBar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { checkingPermission } from '@/redux/reducers/roleReducer';
import { useEffect } from 'react';

const usePermission = () => {
	const { role } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	useEffect(() => {
		routes.forEach((route) => {
			dispatch(checkingPermission(route?.key as string));
		});
	}, [dispatch, role.roles]);

	return role.webPermissions;
};

export default usePermission;
