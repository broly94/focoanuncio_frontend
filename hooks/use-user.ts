import { createAddressUserSchema } from '@/app/profile/components/AdressForm';
import { ApiUser } from '@/lib/api/users.api';
import { useMutation, useQuery } from '@tanstack/react-query';

export const USER_QUERY_KEY = ['Users'];

export function useGetAdressUserById(userId: number, token: string | null) {
	return useQuery({
		queryKey: [...USER_QUERY_KEY, 'adress_user'],
		queryFn: async () => await ApiUser.getAdressUserById(userId, token),
		enabled: !!userId,
	});
}

export function useCreateAddressUser() {
	return useMutation({
		mutationKey: ['create address user'],
		mutationFn: async ({ fullAddress, userId, token }: { fullAddress: createAddressUserSchema | null; userId: number; token: string }) => {
			return await ApiUser.createAddressUser(fullAddress, userId, token);
		},
		retry: false,
	});
}
