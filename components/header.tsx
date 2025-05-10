'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, Bell, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCurrentUser, useLogout } from '@/hooks/use-auth';

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { data: currentUser, isLoading } = useCurrentUser();
	const logout = useLogout();

	const handleLogout = () => {
		logout();
		setIsMenuOpen(false);
	};

	return (
		<header className='bg-white shadow-sm'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16'>
					<div className='flex'>
						<div className='flex-shrink-0 flex items-center'>
							<Link href='/' className='text-2xl font-bold text-emerald-600'>
								Foco Anuncio
							</Link>
						</div>
					</div>

					{/* Desktop navigation */}
					<nav className='hidden md:ml-6 md:flex md:space-x-8'>
						<Link
							href='/'
							className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'
						>
							Inicio
						</Link>
						<Link
							href='/search'
							className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'
						>
							Buscar
						</Link>
						<Link
							href='/maps'
							className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'
						>
							<Map className='h-4 w-4 mr-1' />
							Mapas
						</Link>
						<Link
							href='/about'
							className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'
						>
							Acerca de
						</Link>
					</nav>

					<div className='hidden md:ml-6 md:flex md:items-center'>
						{isLoading ? (
							<div className='h-10 w-24 bg-gray-100 animate-pulse rounded-md'></div>
						) : currentUser ? (
							<>
								<Button variant='ghost' size='icon' className='mr-2'>
									<Bell className='h-5 w-5' />
								</Button>
								<div className='relative ml-3'>
									<div className='group relative'>
										<Button variant='outline' className='flex items-center space-x-2'>
											<User className='h-5 w-5' />
											<span>{currentUser.name.split(' ')[0]}</span>
										</Button>
										<div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block'>
											<Link href='/profile' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
												Mi Perfil
											</Link>
											<Link href='/profile/reservations' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
												Mis Reservas
											</Link>
											<button onClick={handleLogout} className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
												Cerrar Sesión
											</button>
										</div>
									</div>
								</div>
							</>
						) : (
							<>
								<Link
									href='/login'
									className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-emerald-600 bg-white hover:bg-gray-50'
								>
									Iniciar Sesión
								</Link>
								<Link
									href='/register'
									className='ml-3 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700'
								>
									Registrarse
								</Link>
							</>
						)}
					</div>

					{/* Mobile menu button */}
					<div className='flex items-center md:hidden'>
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100'
						>
							<span className='sr-only'>Abrir menú</span>
							{isMenuOpen ? <X className='block h-6 w-6' /> : <Menu className='block h-6 w-6' />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{isMenuOpen && (
				<div className='md:hidden'>
					<div className='pt-2 pb-3 space-y-1'>
						<Link
							href='/'
							className='block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
							onClick={() => setIsMenuOpen(false)}
						>
							Inicio
						</Link>
						<Link
							href='/search'
							className='block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
							onClick={() => setIsMenuOpen(false)}
						>
							Buscar
						</Link>
						<Link
							href='/maps'
							className='block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
							onClick={() => setIsMenuOpen(false)}
						>
							<div className='flex items-center'>
								<Map className='h-4 w-4 mr-2' />
								Mapas
							</div>
						</Link>
						<Link
							href='/about'
							className='block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
							onClick={() => setIsMenuOpen(false)}
						>
							Acerca de
						</Link>
					</div>
					<div className='pt-4 pb-3 border-t border-gray-200'>
						{isLoading ? (
							<div className='px-4 py-2'>
								<div className='h-5 w-24 bg-gray-100 animate-pulse rounded-md'></div>
							</div>
						) : currentUser ? (
							<>
								<div className='flex items-center px-4'>
									<div className='flex-shrink-0'>
										<User className='h-10 w-10 rounded-full bg-gray-100 p-2' />
									</div>
									<div className='ml-3'>
										<div className='text-base font-medium text-gray-800'>{currentUser.name}</div>
										<div className='text-sm font-medium text-gray-500'>{currentUser.email}</div>
									</div>
								</div>
								<div className='mt-3 space-y-1'>
									<Link
										href='/profile'
										className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
										onClick={() => setIsMenuOpen(false)}
									>
										Mi Perfil
									</Link>
									<Link
										href='/profile/reservations'
										className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
										onClick={() => setIsMenuOpen(false)}
									>
										Mis Reservas
									</Link>
									<button
										onClick={handleLogout}
										className='block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
									>
										Cerrar Sesión
									</button>
								</div>
							</>
						) : (
							<div className='flex flex-col space-y-3 px-4'>
								<Link
									href='/login'
									className='block text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-emerald-600 bg-white hover:bg-gray-50'
									onClick={() => setIsMenuOpen(false)}
								>
									Iniciar Sesión
								</Link>
								<Link
									href='/register'
									className='block text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700'
									onClick={() => setIsMenuOpen(false)}
								>
									Registrarse
								</Link>
							</div>
						)}
					</div>
				</div>
			)}
		</header>
	);
}
