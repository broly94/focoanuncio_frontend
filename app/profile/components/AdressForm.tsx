import { Input } from '@/components/ui/input';

export default function AdressForm() {
	return (
		<section className='flex flex-col justify-between w-full'>
			<h2 className='text-center text-xl font-semibold mb-4 text-gray-700'>Dirección</h2>
			<div className='text-center grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-10 '>
				<div>
					<label className='block text-md text-gray-700 font-bold'>Calle</label>
					<Input />
				</div>
				<div>
					<label className='block text-md text-gray-700 font-bold'>Ciudad</label>
					<p className='mt-1 text-violet-500'>Springfield</p>
				</div>
				<div>
					<label className='block text-md text-gray-700 font-bold'>Provincia</label>
					<p className='mt-1 text-violet-500'>Buenos Aires</p>
				</div>
				<div>
					<label className='block text-md text-gray-700 font-bold'>País</label>
					<p className='mt-1 text-violet-500'>Argentina</p>
				</div>
			</div>
		</section>
	);
}
