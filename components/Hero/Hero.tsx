import Link from 'next/link';
import CurrentLocation from '../current-location';
import SearchBar from '../search-bar';
import { Button } from '../ui/button';

export default function Hero() {
	return (
		<section className='min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-3 dark:bg-zinc-900 bg-brand-400 shapedividers_com-766'>
			<div className='flex justify-around w-full mx-auto'>
				{/* Grid de 2 columnas para desktop */}
				<div className='container flex flex-col items-center justify-center pt-24 gap-x-3 '>
					{/* Columna de texto */}
					<div className='container flex flex-col items-center gap-2 lg:text-left mb-5 py-10'>
						<h1 className='text-4xl font-extrabold sm:text-5xl md:text-6xl text-zinc-50'>
							Encontrá <span>negocios o servicios locales</span> en tu zona
						</h1>
						<p className='mt-6 text-xl text-zinc-50'>
							Crea tu perfil comercial <span className='text-brand-600 font-bold'>Gratis</span> en simples pasos y disfruta de las
							herramientas
						</p>

						<div className='container mx-auto mt-10'>
							<SearchBar />
						</div>

						<div className='mt-8 flex flex-col items-center sm:flex-row gap-4 justify-center'>
							<Button size='lg' variant='default' className='w-full md:w-auto'>
								<Link href='/register'>Crear cuenta gratis</Link>
							</Button>
							<Button size='lg' variant='destructive' className=' w-full md:w-auto'>
								<Link href='/categories'>Ver Categorías</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
