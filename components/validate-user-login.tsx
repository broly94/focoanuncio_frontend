'use client';
import { useCurrentUser } from '@/hooks/use-auth';
import { useAuthStore } from '@/lib/store/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ValidateUserLogin() {
	const logout = useAuthStore((state) => state.logout);
	const router = useRouter();

	const { isError } = useCurrentUser();

	useEffect(() => {
		if (isError) {
			logout();
			router.push('/');
		}
	}, [isError, logout]);

	return null;
}
