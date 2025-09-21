'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, Bell, Map, HomeIcon, SearchIcon, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store/auth-store';
import { useRouter } from 'next/navigation';
import UserAvatar from '@/app/login/components/UserAvatar';
import { ThemeToggle } from './them-toggle-button';
import { AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import { Accordion, AccordionContent } from './ui/accordion';
import { AnimatedButton } from './ui/animated-button';

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
		<header className='bg-brand-300 text-white sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16'>
					<div className='flex'>
						<div className='flex-shrink-0 flex justify-center items-center flex-row'>
							<Link href='/' className='text-2xl font-bold hover:text-zinc-800'>
								foco anuncio
							</Link>
						</div>
					</div>

					{/* Desktop navigation */}
					<nav className='hidden md:ml-6 lg:flex md:space-x-8'>
						<Link href='/' className='inline-flex items-center pt-1 hover:text-zinc-800'>
							<div className='flex items-center gap-x-1'>
								<HomeIcon className='h-4 w-4 mr-1' />
								Inicio
							</div>
						</Link>
						<Link href='/search' className='inline-flex items-center pt-1 hover:text-zinc-800'>
							<div className='flex items-center gap-x-1'>
								<SearchIcon className='h-4 w-4 mr-1' />
								Buscar
							</div>
						</Link>
						<Link href='/maps' className='inline-flex items-center pt-1 hover:text-zinc-800'>
							<Map className='h-4 w-4 mr-1' />
							Mapas
						</Link>
						<Link href='/about' className='inline-flex items-center pt-1 hover:text-zinc-800'>
							<div className='flex items-center gap-x-1'>
								<MessageCircle className='h-4 w-4 mr-1' />
								Contactanos
							</div>
						</Link>
					</nav>

					<div className='hidden md:ml-6 lg:flex md:items-center'>
						{user != null ? (
							<>
								<ThemeToggle />
								<Button variant='ghost' size='icon' className='mr-2'>
									<Bell className='h-5 w-5' />
								</Button>
								<div className='relative'>
									<div className='group relative '>
										<Button
											variant='default'
											className='bg-white text-slate-800 hover:text-slate-50 dark:text-slate-50 dark:bg-slate-800 hover:bg-slate-800 mr-4 border dark:border-slate-50 border-slate-800 shadow-md p-5'
										>
											<UserAvatar />
											<span className=''>{user.name}</span>
										</Button>
										<div className='absolute right-0 mt-0 bg-transparent hidden z-10 group-hover:block'>
											<div className='text-slate-800 dark:text-slate-50 mt-4 w-48 bg-slate-100 dark:bg-slate-800 rounded-md shadow-lg py-3 hidden group-hover:inline-block border border-slate-500 dark:border-slate-100'>
												<Link
													href='/profile'
													className='block px-4 py-2 hover:translate-x-1 transition-transform duration-200 hover:text-brand-500'
												>
													Mi Perfil
												</Link>
												<Link
													href='/profile/reservations'
													className='block px-4 py-2 hover:translate-x-1 transition-transform duration-200 hover:text-brand-500'
												>
													Mis Reservas
												</Link>
												<button
													onClick={handleLogout}
													className='block px-4 py-2 hover:translate-x-1 transition-transform duration-200 hover:text-red-600'
												>
													Cerrar Sesión
												</button>
											</div>
										</div>
									</div>
								</div>
							</>
						) : (
							<div className='flex space-x-2'>
								<ThemeToggle />
								<AnimatedButton variant='default' size='default' label='Iniciar Sesión' href='/login' />
								<AnimatedButton variant='secondary' withArrow={false} size='default' label='Registrarse' href='/register' />
							</div>
						)}
					</div>

					{/* Mobile menu button */}
					<div className='flex items-center lg:hidden'>
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
				<div className='lg:hidden'>
					<div className='pt-2 pb-3 space-y-1'>
						<div className='flex justify-end px-4'>
							<ThemeToggle />
						</div>
						<Link href='/' className='block pl-3 pr-4 py-2 border-l-4 dark:text-slate-50' onClick={() => setIsMenuOpen(false)}>
							<div className='flex items-center gap-x-1'>
								<HomeIcon className='h-4 w-4 mr-2' />
								Inicio
							</div>
						</Link>
						<Link href='/search' className='block pl-3 pr-4 py-2 border-l-4 dark:text-slate-50' onClick={() => setIsMenuOpen(false)}>
							<div className='flex items-center gap-x-1'>
								<SearchIcon className='h-4 w-4 mr-2' />
								Buscar
							</div>
						</Link>
						<Link href='/maps' className='block pl-3 pr-4 py-2 border-l-4 dark:text-slate-50' onClick={() => setIsMenuOpen(false)}>
							<div className='flex items-center gap-x-1'>
								<Map className='h-4 w-4 mr-2' />
								Mapas
							</div>
						</Link>
						<Link href='/about' className='block pl-3 pr-4 py-2 border-l-4 dark:text-slate-50' onClick={() => setIsMenuOpen(false)}>
							<div className='flex items-center gap-x-1'>
								<MessageCircle className='h-4 w-4 mr-2' />
								Contactanos
							</div>
						</Link>
					</div>
					<div className='pt-4 pb-3 border-t border-slate-800'>
						{user != null ? (
							<Accordion className='w-full' type='single' defaultValue='item-1' collapsible>
								<AccordionItem value='item-1' className='w-full'>
									<AccordionTrigger className='w-full'>
										<div className='flex w-full items-center justify-between px-4'>
											<div className='flex w-full items-center'>
												<div className='flex-shrink-0'>
													<UserAvatar />
												</div>
												<div className='flex flex-col items-start ml-3 text-end'>
													<div className='text-end text-slate-800 dark:text-slate-50'>{user.name}</div>
													<div className='text-slate-800 dark:text-slate-50'>{user.email}</div>
												</div>
											</div>
											<div>
												<ChevronDown />
											</div>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<div className='mt-3 space-y-1'>
											<Link href='/profile' className='block px-4 py-2 dark:text-slate-50' onClick={() => setIsMenuOpen(false)}>
												Mi Perfil
											</Link>
											<Link
												href='/profile/reservations'
												className='block px-4 py-2 dark:text-slate-50'
												onClick={() => setIsMenuOpen(false)}
											>
												Mis Reservas
											</Link>
											<button onClick={handleLogout} className='block px-4 py-2 dark:text-slate-50'>
												Cerrar Sesión
											</button>
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						) : (
							<div className='flex flex-col space-y-3 px-4'>
								<Button variant='default' size='default' className='font-bold'>
									<Link href='/login' onClick={() => setIsMenuOpen(false)}>
										Iniciar Sesión
									</Link>
								</Button>
								<Button variant='success' size='default' className='font-bold'>
									<Link href='/register' onClick={() => setIsMenuOpen(false)}>
										Registrarse
									</Link>
								</Button>
							</div>
						)}
					</div>
				</div>
			)}
		</header>
	);
}
