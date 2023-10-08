import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { checkingPermission } from '@/redux/reducers/roleReducer';
import { useEffect } from 'react';

const usePermission = (url?: string) => {
	const { role } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (url) {
			dispatch(checkingPermission(url));
		}
	}, [dispatch, url]);

	return role.checkPermission;
};

export default usePermission;
