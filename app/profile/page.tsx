'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { MouseEvent, useState } from 'react';

enum TabItems {
	PROFILE = 'Perfil',
	ADDRESS = 'Dirección',
	CONFIG = 'configuración',
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
				<div className='max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6'>
					{/* Sección de Perfil */}
					<section className='mb-8'>
						<h2 className='text-xl font-semibold mb-4 text-gray-700'>Información Personal</h2>
						<div className='flex items-center space-x-4'>
							<img src='https://i.pravatar.cc/100' alt='Foto de perfil' className='w-20 h-20 rounded-full' />
							<div>
								<p className='text-lg font-medium text-gray-800'>Leonel Carro</p>
								<p className='text-gray-600'>leonel@example.com</p>
							</div>
						</div>
					</section>

					{/* Sección de Dirección */}
					<section>
						<h2 className='text-xl font-semibold mb-4 text-gray-700'>Dirección</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700'>Calle</label>
								<p className='mt-1 text-gray-800'>Av. Siempre Viva 742</p>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700'>Ciudad</label>
								<p className='mt-1 text-gray-800'>Springfield</p>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700'>Provincia</label>
								<p className='mt-1 text-gray-800'>Buenos Aires</p>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700'>País</label>
								<p className='mt-1 text-gray-800'>Argentina</p>
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
