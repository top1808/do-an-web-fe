import { useAppSelector } from '@/redux/hooks';

const useUser = () => {
	const { auth } = useAppSelector((state) => state);
	return auth;
};

export default useUser;
