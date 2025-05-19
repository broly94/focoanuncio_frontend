'use client';
import { useAuthStore } from '@/lib/store/auth-store';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ClientHomePage() {
	const searchParam = useSearchParams();
	const token = searchParam.get('token');
	const setToken = useAuthStore((state) => state.setToken);
	const router = useRouter();

	useEffect(() => {
		if (token) {
			setToken(token);
			router.push('/');
		}
	}, [token]);

	return <h1>Redirect Home</h1>;
}
