'use client';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/auth-store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProfileForm() {
	const userState = useAuthStore((state) => state.user);
	return (
		<section className='flex flex-col gap-5 mb-8'>
			<h2 className='text-xl font-semibold mb-4 text-gray-700'>Información Personal</h2>
			<div className='flex flex-col flex-wrap items-center'>
				<Image
					src={userState?.avatar || '/images/user/user_default_avatar.svg'}
					width={20}
					height={20}
					alt='Foto de perfil'
					className='w-20 h-20 rounded-full'
				/>
				<div className='flex  flex-col items-center'>
					<p className='text-lg text-center font-medium text-gray-800'>{userState?.name}</p>
					<p className='text-gray-600'>{userState?.email}</p>
				</div>
			</div>
			<div className='flex justify-center'>
				<Button
					size='lg'
					variant='default'
					className='bg-white text-violet-600 hover:bg-violet-100 mr-4 shadow-md border border-slate-300'
					asChild
				>
					<Link href='/register'>Recuperar contraseña</Link>
				</Button>
			</div>
		</section>
	);
}
