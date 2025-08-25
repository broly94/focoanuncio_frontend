'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useProvinces, useLocalities } from '@/hooks/use-location';
import { useLocationStore } from '@/app/profile/store/location-store';
import { Button } from '@/components/ui/button';

// -------------------
// Schema con Zod
// -------------------
const adressSchema = z.object({
	province: z.string().min(1, 'Selecciona una provincia'),
	city: z.string().min(1, 'La ciudad es requerida'),
	address: z.string().min(1, 'La calle es requerida'),
	postalCode: z.string().min(4, 'Código postal inválido'),
	country: z.string().transform(() => 'Argentina'),
});

type AdressFormData = z.infer<typeof adressSchema>;

export default function AdressForm() {
	const { provinceSelected, setProvinceSelected } = useLocationStore();

	const { data: provinces, isLoading } = useProvinces();
	const { data: municipalities } = useLocalities('06', 'Quilmes');

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<AdressFormData>({
		resolver: zodResolver(adressSchema),
		defaultValues: {
			country: 'Argentina',
		},
	});

	// Sincronizar el store con el form cuando se seleccione provincia
	const handleProvinceChange = (value: string) => {
		setValue('province', value);
		setProvinceSelected(value);
	};

	const onSubmit = (data: AdressFormData) => {
		console.log('Formulario enviado:', data);
		// acá llamás al backend con axios o Tanstack mutation
	};

	return (
		<section className='flex flex-col justify-between w-full'>
			<h2 className='text-center text-xl font-semibold mb-4 text-gray-700'>Dirección</h2>

			<form onSubmit={handleSubmit(onSubmit)} className='text-start grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-10'>
				{/* Provincia */}
				<div>
					<label className='block text-md text-gray-700 font-bold pl-2'>Provincia</label>
					<Select onValueChange={handleProvinceChange}>
						<SelectTrigger>
							<SelectValue placeholder='Selecciona una provincia' />
						</SelectTrigger>
						<SelectContent>
							{isLoading && <p>Cargando...</p>}
							{provinces?.map((prov: any) => (
								<SelectItem key={prov.province_id} value={prov.name}>
									{prov.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors.province && <p className='text-sm text-red-500'>{errors.province.message}</p>}
				</div>

				{/* Ciudad */}
				<div>
					<label className='block text-md text-gray-700 font-bold pl-2'>Ciudad</label>
					<Input placeholder='Berazategui' disabled={!watch('province')} {...register('city')} />
					{errors.city && <p className='text-sm text-red-500'>{errors.city.message}</p>}
				</div>

				{/* Calle */}
				<div className='flex flex-col'>
					<label className='block text-md text-gray-700 font-bold pl-2'>Calle</label>
					<Input placeholder='Av General Jose de San Martin' {...register('address')} />
					{errors.address && <p className='text-sm text-red-500'>{errors.address.message}</p>}
				</div>

				{/* Código Postal */}
				<div>
					<label className='block text-md text-gray-700 font-bold pl-2'>Código Postal</label>
					<Input placeholder='1884' {...register('postalCode')} />
					{errors.postalCode && <p className='text-sm text-red-500'>{errors.postalCode.message}</p>}
				</div>

				{/* País */}
				<div>
					<label className='block text-md text-gray-700 font-bold pl-2'>País</label>
					<Input disabled {...register('country')} />
				</div>

				<div className='col-span-2 flex justify-end'>
					<Button type='submit'>Guardar dirección</Button>
				</div>
			</form>
		</section>
	);
}
