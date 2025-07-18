'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import ProfileForm from '@/app/profile/components/ProfileForm';
import AdressForm from '@/app/profile/components/AdressForm';
import ConfigForm from '@/app/profile/components/ConfigForm';

enum TabItems {
	PROFILE = 'Perfil',
	ADDRESS = 'Dirección',
	CONFIG = 'Configuración',
	LOGOUT = 'Cerrar Sesión',
}

const ItemsLinks = [
	{ title: TabItems.PROFILE, href: '/profile' },
	{ title: TabItems.ADDRESS, href: '/profile/address' },
	{ title: TabItems.CONFIG, href: '/profile/config' },
	{ title: TabItems.LOGOUT, href: '/logout' },
];

export default function Dashboard() {
	const [activeTab, setActiveTab] = useState<string>('Perfil');

	const handleClick = (e: MouseEvent<HTMLAnchorElement>, title: string) => {
		e.preventDefault();
		setActiveTab(title);
	};

	return (
		<div className='min-h-screen flex w-full justify-center container pt-10'>
			{/* Sidebar */}
			<aside className='w-72 hidden md:flex flex-1 flex-col shadow-md p-6'>
				<h2 className='text-2xl font-bold text-violet-600 mb-8'>Mi Cuenta</h2>
				<nav className='flex flex-col w-full space-y-4 text-gray-700'>
					{ItemsLinks.map((item, index) => (
						<Link
							key={index}
							href={item.href}
							onClick={(e) => handleClick(e, item.title)}
							className={`flex items-center p-1 rounded-lg hover:text-violet-600 transition-colors
								${activeTab === item.title ? 'text-violet-600' : 'text-black'}`}
						>
							<span className='text-lg font-medium'>{item.title}</span>
						</Link>
					))}
				</nav>
			</aside>

			{/* Contenido principal */}
			<main className='flex-2 w-full p-6'>
				<div className='md:hidden mb-6 mx-auto bg-slate-200 shadow-lg rounded-2xl p-6 border border-slate-300'>
					<div className='bg-white border border-slate-300 rounded-md shadow-sm mt-6 p-5'>
						<ProfileForm />
					</div>
					<div className='bg-white border border-slate-300 rounded-md shadow-sm mt-6 p-5'>
						<AdressForm />
					</div>
					<div className='bg-white border border-slate-300 rounded-md shadow-sm mt-6 p-5'>
						<ConfigForm />
					</div>
				</div>
				<div className='max-w-4xl hidden md:flex justify-center mx-auto bg-slate-200 shadow-lg rounded-2xl p-6 border border-slate-300'>
					{activeTab === TabItems.PROFILE && <ProfileForm />}
					{activeTab === TabItems.ADDRESS && <AdressForm />}
					{activeTab == TabItems.CONFIG && <ConfigForm />}
				</div>
			</main>
		</div>
	);
}
