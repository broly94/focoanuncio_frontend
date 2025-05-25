'use client';
import { useAuthStore } from '@/lib/store/auth-store';
import Image from 'next/image';

export default function UserAvatar() {
	const user = useAuthStore((state) => state.user);
	return (
		<Image
			className='rounded-full'
			src={user?.avatar || '/images/user/user_default_avatar.svg'}
			alt='User Avatar'
			width={30}
			height={30}
			//className='rounded-full border-2 border-gray-300 shadow-sm'
			priority
		/>
	);
}
