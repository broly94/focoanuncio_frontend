import Link from 'next/link';
import CategoryCard from '@/components/category-card';
import SearchBar from '@/components/search-bar';
import AdvertBanner from '@/components/advert-banner';
import { popularCategories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import AuthHandlerGoogleRedirect from '@/app/login/components/AuthHandlerGoogleRedirect';

export default function Home() {
	return (
		<>
			<AuthHandlerGoogleRedirect />
			<main className='min-h-screen w-full'>
				{/* Hero Section with Search - Full Screen Height */}
				<section className='relative bg-gradient-to-r bg-slate-200 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8'>
					<div className='max-w-5xl mx-auto text-center'>
						<h1 className='text-4xl font-extrabold text-violet-800 sm:text-5xl md:text-6xl'>Encuentra la mejor estrategia de marketing</h1>
						<p className='mt-3 max-w-md mx-auto text-xl text-violet-400 sm:text-2xl md:max-w-3xl'>
							Conecta con negocios locales y descubre estrategias efectivas para tu empresa
						</p>
						<div className='mt-10'>
							<SearchBar />
						</div>
						<div className='mt-10'>
							<Button size='lg' variant='default' className='bg-white text-violet-600 hover:bg-violet-100 mr-4 shadow-md' asChild>
								<Link href='/register'>Crear cuenta gratis</Link>
							</Button>
							<Button size='lg' variant='default' className='bg-white text-violet-600 hover:bg-violet-100 mr-4 shadow-md' asChild>
								<Link href='/search'>Explorar estrategias</Link>
							</Button>
						</div>
					</div>
					<div className='absolute bottom-10 left-0 right-0 text-center'>
						<a href='#categories' className='text-white animate-bounce inline-block'>
							<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
							</svg>
						</a>
					</div>
				</section>

				{/* Popular Categories */}
				<section id='categories' className='py-12 bg-gray-50 px-4 sm:px-6 lg:px-8'>
					<div className='max-w-7xl mx-auto'>
						<h2 className='text-3xl font-bold text-gray-900 mb-8'>Categorías más buscadas</h2>
						<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
							{popularCategories.map((category) => (
								<CategoryCard key={category.id} category={category} />
							))}
						</div>
					</div>
				</section>

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
				<section className='py-12 bg-white px-4 sm:px-6 lg:px-8'>
					<div className='max-w-7xl mx-auto'>
						<div className='text-center mb-12'>
							<h2 className='text-3xl font-bold text-gray-900'>Beneficios de publicitar en FocoAnuncio</h2>
							<p className='mt-4 text-xl text-gray-600 max-w-3xl mx-auto'>
								Conecta con clientes potenciales y haz crecer tu negocio con nuestra plataforma especializada en estrategias de marketing
							</p>
						</div>

						<div className='grid md:grid-cols-3 gap-8'>
							<div className='bg-gray-50 rounded-xl p-6 text-center'>
								<div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<svg
										className='w-8 h-8 text-emerald-600'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
										/>
									</svg>
								</div>
								<h3 className='text-xl font-bold mb-2'>Mayor visibilidad</h3>
								<p className='text-gray-600'>
									Destaca tu estrategia de marketing entre miles de usuarios que buscan servicios como el tuyo.
								</p>
							</div>

							<div className='bg-gray-50 rounded-xl p-6 text-center'>
								<div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<svg
										className='w-8 h-8 text-emerald-600'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
										/>
									</svg>
								</div>
								<h3 className='text-xl font-bold mb-2'>Audiencia cualificada</h3>
								<p className='text-gray-600'>Conecta con usuarios interesados específicamente en tu sector y ubicación geográfica.</p>
							</div>

							<div className='bg-gray-50 rounded-xl p-6 text-center'>
								<div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<svg
										className='w-8 h-8 text-emerald-600'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
										/>
									</svg>
								</div>
								<h3 className='text-xl font-bold mb-2'>Análisis detallado</h3>
								<p className='text-gray-600'>Obtén estadísticas sobre el rendimiento de tu estrategia y conoce mejor a tu audiencia.</p>
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

									<Button variant='outline' className='w-full' asChild>
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

									<Button className='w-full' asChild>
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
							<Button size='lg' variant='outline' className='border-white text-white hover:bg-emerald-700' asChild>
								<Link href='/search'>Explorar estrategias</Link>
							</Button>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
