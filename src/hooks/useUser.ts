import { useAppSelector } from '@/redux/hooks';
import { getAuthState } from '@/redux/reducers/authReducer';

const useUser = () => {
	const auth = useAppSelector(getAuthState);
	return auth;
};

export default useUser;
