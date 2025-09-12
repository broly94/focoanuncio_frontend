'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, Bell, Map, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store/auth-store';
import { useRouter } from 'next/navigation';
import UserAvatar from '@/app/login/components/UserAvatar';
import Image from 'next/image';

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);
	const route = useRouter();

	const handleLogout = () => {
		logout();
		setIsMenuOpen(false);
		route.push('/login');
	};

	return (
		<header className='bg-white shadow-sm'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16'>
					<div className='flex'>
						<div className='flex-shrink-0 flex justify-center items-center flex-row'>
							<Link href='/' className='text-2xl font-bold text-violet-600'>
								<Image src={`/images/icon-foco.svg`} alt='foco' width={50} height={50} />
							</Link>
						</div>
					</div>

					{/* Desktop navigation */}
					<nav className='hidden md:ml-6 md:flex md:space-x-8'>
						<Link
							href='/'
							className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-base font-medium text-slate-600 hover:text-violet-700 hover:border-violet-300'
						>
							Inicio
						</Link>
						<Link
							href='/search'
							className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-base font-medium text-slate-600 hover:text-violet-700 hover:border-violet-300'
						>
							Buscar
						</Link>
						<Link
							href='/maps'
							className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-base font-medium text-slate-600 hover:text-violet-700 hover:border-violet-300'
						>
							<Map className='h-4 w-4 mr-1' />
							Mapas
						</Link>
						<Link
							href='/about'
							className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-base font-medium text-slate-600 hover:text-violet-700 hover:border-violet-300'
						>
							Acerca de
						</Link>
					</nav>

					<div className='hidden md:ml-6 md:flex md:items-center'>
						{user != null ? (
							<>
								<Button variant='ghost' size='icon' className='mr-2'>
									<Bell className='h-5 w-5' />
								</Button>
								<div className='relative'>
									<div className='group relative '>
										<Button
											variant='default'
											className='bg-white text-violet-600 hover:bg-violet-100 mr-4 shadow-md border border-slate-300 p-5'
										>
											<UserAvatar />
											<span className='text-base text-slate-800'>{user.name}</span>
										</Button>
										<div className='absolute right-0 mt-0 bg-transparent hidden z-10 group-hover:block border-1 border-gray-900'>
											<div className=' mt-2 w-48 bg-slate-100 rounded-md shadow-lg  py-3  hidden group-hover:inline-block border border-gray-400'>
												<Link
													href='/profile'
													className='block px-4 py-2 text-sm text-gray-700 hover:text-violet-600 hover:translate-x-1 transition-transform duration-200'
												>
													Mi Perfil
												</Link>
												<Link
													href='/profile/reservations'
													className='block px-4 py-2 text-sm text-gray-700 hover:text-violet-600 hover:translate-x-1 transition-transform duration-200'
												>
													Mis Reservas
												</Link>
												<button
													onClick={handleLogout}
													className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-violet-600 hover:translate-x-1 transition-transform duration-200'
												>
													Cerrar Sesión
												</button>
											</div>
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
						{user != null ? (
							<>
								<div className='flex items-center px-4'>
									<div className='flex-shrink-0'>
										<UserAvatar />
									</div>
									<div className='ml-3'>
										<div className='text-base font-medium text-gray-800'>{user.name}</div>
										<div className='text-sm font-medium text-gray-500'>{user.email}</div>
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
