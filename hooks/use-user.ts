import { ApiUser } from '@/lib/api/users.api';
import { useQuery } from '@tanstack/react-query';

export const USER_QUERY_KEY = ['Users'];

export function useGetAdressUserById(userId: number, token: string | null) {
	return useQuery({
		queryKey: [...USER_QUERY_KEY, 'adress_user'],
		queryFn: () => ApiUser.getAdressUserById(userId, token),
		enabled: !!userId,
	});
}
