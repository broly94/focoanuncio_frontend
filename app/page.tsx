import Link from 'next/link';
import CategoryCard from '@/components/home-categories/CategoryCard';
import SearchBar from '@/components/search-bar';
import AdvertBanner from '@/components/advert-banner';
import { popularCategories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { CheckCircle2, LocateFixed } from 'lucide-react';
import AuthHandlerGoogleRedirect from '@/app/login/components/auth-handler-google-redirect';
import CurrentLocation from '@/components/current-location';
import Category from '@/components/home-categories/Category';

export default function Home() {
	return (
		<>
			{/* Verifica en el home page si la url contiene parametros de logueo con google o no */}
			{/* Esto se hace para verificar que si esta logueado con google para poder guardar los datos en local, asi tambien como el token de inicio de sesión */}
			<AuthHandlerGoogleRedirect />
			<main className='min-h-screen w-full'>
				{/* Hero Section with Search - Full Screen Height */}
				<section className='flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900'>
					<div className='flex justify-around w-full mx-auto'>
						{/* Grid de 2 columnas para desktop */}
						<div className='grid grid-cols-1 lg:grid-cols-2 items-center w-full pt-10 lg:m-20'>
							{/* Columna de texto */}
							<div className='flex flex-col gap-2 text-center lg:text-left'>
								<h1 className='text-4xl font-extrabold sm:text-5xl md:text-6xl'>
									Encuentra <span>negocios locales</span> cerca de ti
								</h1>
								<p className='mt-6 text-xl max-w-2xl'>
									Descubre y conecta con comercios, servicios y profesionales en tu zona. Tu guía digital del barrio.
								</p>

								<div className='mt-10'>
									<SearchBar />
								</div>

								<div className='mt-6'>
									<CurrentLocation />
								</div>

								<div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
									<Button size='lg' variant='default'>
										<Link href='/register'>Crear cuenta gratis</Link>
									</Button>
									<Button size='lg' variant='link' className='border-primary-500 text-primary-600 hover:bg-primary-50'>
										<Link href='/search'>Explorar negocios</Link>
									</Button>
								</div>
							</div>

							{/* Columna de imagen */}
							<div className='hidden lg:block'>
								<img
									src='images/undraw_world.svg'
									alt='Ilustración de persona encontrando negocios locales'
									className='w-full max-w-md mx-auto'
								/>
							</div>
						</div>
					</div>
				</section>
				{/* Popular Categories */}
				<Category />
				{/* Advertisement Banners */}
				<section className='py-12 px-4 sm:px-6 lg:px-8'>
					<div className='max-w-7xl mx-auto'>
						<h2 className='text-3xl font-bold text-gray-900 mb-8'>Publicidad destacada</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<AdvertBanner
								imageUrl='/placeholder.svg?height=250&width=600'
								title='Impulsa tu negocio'
								description='Crea tu estrategia de marketing hoy mismo'
								link='/register'
							/>
							<AdvertBanner
								imageUrl='/placeholder.svg?height=250&width=600'
								title='Estrategias premium'
								description='Descubre las mejores estrategias para tu sector'
								link='/search'
							/>
						</div>
					</div>
				</section>
				{/* Benefits Section */}

				<section className='py-16 bg-white px-4 sm:px-6 lg:px-8'>
					<div className='max-w-7xl mx-auto'>
						<div className='text-center mb-12'>
							<h2 className='text-3xl font-bold text-gray-900'>Por qué elegir FocoAnuncio</h2>
							<p className='mt-4 text-xl text-gray-600 max-w-3xl mx-auto'>
								La plataforma todo-en-uno para gestionar y hacer crecer tu negocio local
							</p>
						</div>

						<div className='grid md:grid-cols-3 gap-8'>
							{/* Beneficio 1 */}
							<div className='bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow'>
								<div className='w-16 h-16 bg-growth-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<svg className='w-8 h-8 text-growth-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
										/>
									</svg>
								</div>
								<h3 className='text-xl font-bold mb-2'>Alcance local</h3>
								<p className='text-gray-600'>Llega a clientes en tu área inmediata con nuestra tecnología de geolocalización precisa.</p>
							</div>

							{/* Beneficio 2 */}
							<div className='bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow'>
								<div className='w-16 h-16 bg-growth-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<svg className='w-8 h-8 text-growth-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
										/>
									</svg>
								</div>
								<h3 className='text-xl font-bold mb-2'>Gestión autónoma</h3>
								<p className='text-gray-600'>
									Controla tu perfil, actualiza información y gestiona tu presencia en línea sin intermediarios.
								</p>
							</div>

							{/* Beneficio 3 */}
							<div className='bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow'>
								<div className='w-16 h-16 bg-growth-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<svg className='w-8 h-8 text-growth-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
									</svg>
								</div>
								<h3 className='text-xl font-bold mb-2'>Herramientas integradas</h3>
								<p className='text-gray-600'>Catálogo digital, reserva de turnos y análisis de desempeño todo en un solo lugar.</p>
							</div>
						</div>
					</div>
				</section>
				{/* Pricing Plans */}
				<section className='py-12 bg-gray-50 px-4 sm:px-6 lg:px-8'>
					<div className='max-w-7xl mx-auto'>
						<div className='text-center mb-12'>
							<h2 className='text-3xl font-bold text-gray-900'>Nuestros planes</h2>
							<p className='mt-4 text-xl text-gray-600 max-w-3xl mx-auto'>
								Elige el plan que mejor se adapte a tus necesidades y comienza a promocionar tu estrategia de marketing
							</p>
						</div>

						<div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
							{/* Plan Gratuito */}
							<div className='bg-white rounded-xl shadow-sm overflow-hidden'>
								<div className='p-8'>
									<h3 className='text-2xl font-bold text-gray-900 mb-4'>Plan Gratuito</h3>
									<div className='mb-4'>
										<span className='text-5xl font-bold'>$0</span>
										<span className='text-gray-600'>/mes</span>
									</div>
									<p className='text-gray-600 mb-6'>Perfecto para comenzar a promocionar tu negocio</p>

									<ul className='space-y-3 mb-8'>
										<li className='flex items-start'>
											<CheckCircle2 className='h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5' />
											<span>Perfil básico de estrategia de marketing</span>
										</li>
										<li className='flex items-start'>
											<CheckCircle2 className='h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5' />
											<span>Hasta 5 palabras clave</span>
										</li>
										<li className='flex items-start'>
											<CheckCircle2 className='h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5' />
											<span>Información de contacto básica</span>
										</li>
										<li className='flex items-start'>
											<CheckCircle2 className='h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5' />
											<span>Hasta 3 imágenes en galería</span>
										</li>
										<li className='flex items-start'>
											<CheckCircle2 className='h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5' />
											<span>Recibir valoraciones y comentarios</span>
										</li>
									</ul>

									<Button variant='secondary' className='w-full' asChild>
										<Link href='/register?plan=free'>Comenzar gratis</Link>
									</Button>
								</div>
							</div>

							{/* Plan Premium */}
							<div className='bg-white rounded-xl shadow-sm overflow-hidden border-2 border-emerald-500 relative'>
								<div className='absolute top-0 right-0 bg-emerald-500 text-white px-4 py-1 rounded-bl-lg font-medium text-sm'>
									Recomendado
								</div>
								<div className='p-8'>
									<h3 className='text-2xl font-bold text-gray-900 mb-4'>Plan Premium</h3>
									<div className='mb-4'>
										<span className='text-5xl font-bold'>$29</span>
										<span className='text-gray-600'>/mes</span>
									</div>
									<p className='text-gray-600 mb-6'>Todo lo que necesitas para maximizar tu visibilidad</p>

									<ul className='space-y-3 mb-8'>
										<li className='flex items-start'>
											<CheckCircle2 className='h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5' />
											<span>Todo lo incluido en el plan gratuito</span>
										</li>
										<li className='flex items-start'>
											<CheckCircle2 className='h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5' />
											<span>Banner personalizado en tu estrategia</span>
										</li>
										<li className='flex items-start'>
											<CheckCircle2 className='h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5' />
											<span>Foto de perfil personalizada</span>
										</li>
										<li className='flex items-start'>
											<CheckCircle2 className='h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5' />
											<span>Sistema de reserva de turnos</span>
										</li>
										<li className='flex items-start'>
											<CheckCircle2 className='h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5' />
											<span>Posicionamiento prioritario en búsquedas</span>
										</li>
										<li className='flex items-start'>
											<CheckCircle2 className='h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5' />
											<span>Hasta 20 imágenes en galería</span>
										</li>
										<li className='flex items-start'>
											<CheckCircle2 className='h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5' />
											<span>Estadísticas detalladas de visitas</span>
										</li>
									</ul>

									<Button className='w-full' variant='success' asChild>
										<Link href='/register?plan=premium'>Comenzar ahora</Link>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* Call to Action */}
				<section className='py-12 bg-emerald-600 px-4 sm:px-6 lg:px-8'>
					<div className='max-w-4xl mx-auto text-center'>
						<h2 className='text-3xl font-bold text-white mb-4'>¿Listo para impulsar tu negocio?</h2>
						<p className='text-xl text-white/90 mb-8'>
							Únete a miles de empresas que ya están aprovechando FocoAnuncio para aumentar su visibilidad y conseguir más clientes.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Button size='lg' variant='default' className='bg-white text-emerald-600 hover:bg-gray-100' asChild>
								<Link href='/register'>Crear cuenta gratis</Link>
							</Button>
							<Button size='lg' variant='secondary' className='border-white text-white hover:bg-emerald-700' asChild>
								<Link href='/search'>Explorar estrategias</Link>
							</Button>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
