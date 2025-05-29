'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Split } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth-store';

// Clave global para la consulta del usuario actual
export const CURRENT_USER_QUERY_KEY = ['currentUser'];

// Hook para obtener el usuario actual
export function useCurrentUser() {
	return useQuery({
		queryKey: CURRENT_USER_QUERY_KEY,
		queryFn: () => api.getCurrentUser(),
	});
}

// Hook para iniciar sesión
export function useLogin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) => api.login(email, password),
		onSuccess: (data: any) => {
			console.log(data);
			const user = { name: data.name, email: data.email };
			useAuthStore.getState().setUser(user);
			useAuthStore.getState().setToken(data.token);
			queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
		},
		onError: (error: any) => {
			throw new Error(error.message);
		},
	});
}

// Hook para registrarse
export function useRegister() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			name,
			lastName,
			phone,
			email,
			password,
		}: {
			name: string;
			lastName: string;
			phone: string;
			email: string;
			password: string;
		}) => api.register(name, lastName, phone, email, password),
		onSuccess: (data) => {
			console.log(data);
			// En una aplicación real, almacenarías el token en localStorage o una cookie segura
			//localStorage.setItem('token', data?.token);

			// Invalidar y volver a obtener la consulta del usuario actual
			queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
		},
		onError: (error: any) => {
			throw new Error(error.message);
		},
	});
}

// // Hook para cerrar sesión
// export function useLogout() {
// 	const logout = useAuthStore((state) => state.logout);
// }
