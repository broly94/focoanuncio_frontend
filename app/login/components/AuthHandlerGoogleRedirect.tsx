'use client';
import { useAuthStore } from '@/lib/store/auth-store';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthHandlerGoogleRedirect() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const setUser = useAuthStore((state) => state.setUser);
	const setToken = useAuthStore((state) => state.setToken);

	useEffect(() => {
		const token = searchParams.get('token');
		const user_email = searchParams.get('user_email');
		const user_name = searchParams.get('user_name');
		const avatar = searchParams.get('avatar');

		if (token && user_email && user_name) {
			setToken(token);
			setUser({ email: user_email, name: user_name, avatar: avatar });
			router.replace('/');
		}
	}, [searchParams, setUser, setToken]);

	return null;
}
