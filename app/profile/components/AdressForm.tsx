'use client';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProvinces } from '@/hooks/use-location';
import { useAuthStore } from '@/lib/store/auth-store';
import { useEffect } from 'react';

export default function AdressForm() {
	useAuthStore((state) => state.user);

	const { data: provinces, isError, isLoading } = useProvinces();

	console.log(provinces);

	return (
		<section className='flex flex-col justify-between w-full'>
			<h2 className='text-center text-xl font-semibold mb-4 text-gray-700'>Dirección</h2>
			<div className='text-start grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-10 '>
				<div>
					<label className='block text-md text-gray-700 font-bold pl-2'>Provincia</label>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder='Selecciona una provincia' />
						</SelectTrigger>
						<SelectContent>
							{provinces?.map((prov: any) => (
								<SelectItem key={prov.province_id} value={prov.name}>
									{prov.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div>
					<label className='block text-md text-gray-700 font-bold pl-2'>Ciudad</label>
					<Input about='city' alt='city' placeholder='Berazategui' />
				</div>
				<div className='flex flex-col'>
					<label className='block text-md text-gray-700 font-bold pl-2'>Calle</label>
					<Input about='adress' alt='adress' placeholder='Av General Jose de San Martin' />
				</div>
				<div>
					<label className='block text-md text-gray-700 font-bold pl-2'>Pais</label>
					<Input about='country' alt='country' disabled value={'Argentina'} />
				</div>
			</div>
		</section>
	);
}
