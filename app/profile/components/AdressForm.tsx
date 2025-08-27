'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useProvinces, useLocalities } from '@/hooks/use-location';
import { useLocationStore } from '@/app/profile/store/location-store';
import useDebounced from '@/hooks/use-debounced';
import MunicipalityAutomcomplete from './MunicipalityAutomcomplete';

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
			city: '',
			province: '',
		},
	});

	const { provinceSelected, setProvinceSelected } = useLocationStore();

	const { data: provinces, isLoading } = useProvinces();

	// ciudad escrita (con debounce) -> se usa para pedir al backend
	const debouncedMunicipality = useDebounced(watch('city') ?? '', 500);

	// cargar localidades desde backend en base a provincia + city (ya tenés datos en tiempo real acá)
	const { data } = useLocalities(provinceSelected, debouncedMunicipality);

	const municipalities = Array.isArray(data) ? data : [];

	// provincia seleccionada
	const handleProvinceChange = (value: string) => {
		setValue('province', value, { shouldDirty: true });
		// Setea la provincia seleccionada en el store
		setProvinceSelected(value);
		// limpiar ciudad y calle cuando se cambia la provincia
		setValue('city', '', { shouldDirty: true, shouldValidate: false });
	};

	const onSubmit = (data: AdressFormData) => {
		console.log('Formulario enviado:', data);
		// acá llamás al backend con axios o Tanstack mutation
	};

	// debug: ver en tiempo real lo que trae el hook
	console.log('Municipalities:', municipalities);

	return (
		<section className='grid grid-cols-1 justify-between w-full'>
			<h2 className='text-center text-xl font-semibold mb-4 text-gray-700'>Dirección</h2>

			<form onSubmit={handleSubmit(onSubmit)} className='text-start grid grid-cols-1 sm:grid-cols-2 grid-rows-4 gap-4'>
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
								<SelectItem key={prov.province_id} value={String(prov.province_id)}>
									{prov.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors.province && <p className='text-sm text-red-500'>{errors.province.message}</p>}
				</div>

				{/* Ciudad con autocomplete */}
				<div>
					<label className='block text-md text-gray-700 font-bold pl-2'>Ciudad</label>
					<MunicipalityAutomcomplete
						municipalities={municipalities} // array de resultados
						value={watch('city') || ''} // valor actual del input
						onChange={(val) => setValue('city', val)} // actualizar el form
						disabled={!watch('province')} // deshabilitar si no hay provincia
					/>
					{errors.city && <p className='text-sm text-red-500'>{errors.city.message}</p>}
				</div>

				{/* Calle */}
				<div className='flex flex-col'>
					<label className='block text-md text-gray-700 font-bold pl-2'>Calle</label>
					<Input placeholder='Av General Jose de San Martin' disabled={!watch('city')} {...register('address')} />
					{errors.address && <p className='text-sm text-red-500'>{errors.address.message}</p>}
				</div>

				{/* Código Postal */}
				<div>
					<label className='block text-md text-gray-700 font-bold pl-2'>Código Postal</label>
					<Input placeholder='1884' {...register('postalCode')} disabled={!watch('city')} />
					{errors.postalCode && <p className='text-sm text-red-500'>{errors.postalCode.message}</p>}
				</div>

				{/* País */}
				<div>
					<label className='block text-md text-gray-700 font-bold pl-2'>País</label>
					<Input disabled {...register('country')} />
				</div>

				<div className='flex justify-end'>
					<Button variant='default' type='submit' className='bg-white text-violet-600 hover:bg-violet-100 mr-4 shadow-md'>
						Guardar o Actualizar
					</Button>
				</div>
			</form>
		</section>
	);
}
