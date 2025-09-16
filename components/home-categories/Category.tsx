'use client';
import CategoryCard from '@/components/home-categories/CategoryCard';

export default function Category() {
	return (
		<section id='categories' className='py-12 bg-slate-200 backdrop-blur-lg dark:bg-slate-950 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				<h2 className='text-3xl font-bold mb-8'>Algunas categorías disponibles</h2>
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
					<CategoryCard />
				</div>
			</div>
		</section>
	);
}
