'use client';
import { useAuthStore } from '@/lib/store/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ValidateUserLogin() {
	const token = useAuthStore((state) => state.token);
	const logout = useAuthStore((state) => state.logout);
	const router = useRouter();
	console.log(token);
	useEffect(() => {
		if (!token) {
			logout();
			router.push('/login');
		}
	}, [token]);

	return null;
}
