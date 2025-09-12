'use client';

import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useProvinces, useLocalities, useAdressGeoRef } from '@/hooks/use-location';
import useDebounced from '@/hooks/use-debounced';
import SearchState from '@/app/profile/components/SearchState';
import { useAuthStore } from '@/lib/store/auth-store';
import { useCreateAddressUser } from '@/hooks/use-user';

import { OrbitProgress } from 'react-loading-indicators';
import Loading from '@/app/profile/components/Loading';

// -------------------
// Schema con Zod
// -------------------
const adressSchema = z.object({
	province: z.string().min(1, 'Selecciona una provincia'),
	state: z.string().min(1, 'La ciudad es requerida'),
	address: z.string().min(1, 'La calle es requerida'),
	postalCode: z.string().min(4, 'Código postal inválido'),
	country: z.string().transform(() => 'Argentina'),
});

export interface createAddressUserSchema {
	province: string;
	state: string;
	address: string;
	postCode: string;
	lat: number;
	lon: number;
	user: number | undefined;
}

type AdressFormData = z.infer<typeof adressSchema>;

const AdressForm = memo(() => {
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
			state: '',
			province: '',
		},
	});

	const [provinceSelected, setProvinceSelected] = useState<string>('');

	const { data: provinces, isLoading } = useProvinces();

	const { token, user } = useAuthStore((state) => state);

	// municipio escrito (con debounce) -> se usa para pedir al backend
	const debouncedState = useDebounced(watch('state') ?? '', 500);

	// cargar localidades desde backend en base a provincia + city (ya tenés datos en tiempo real acá)
	const { data } = useLocalities(provinceSelected, debouncedState);
	const states = Array.isArray(data) ? data : [];

	// provincia seleccionada
	const handleProvinceChange = (value: string) => {
		setValue('province', value, { shouldDirty: true });
		// Setea la provincia seleccionada en el store
		setProvinceSelected(value);
		// limpiar ciudad y calle cuando se cambia la provincia
		setValue('state', '', { shouldDirty: true, shouldValidate: false });
	};

	const addressGeoref = useAdressGeoRef();

	const createUser = useCreateAddressUser();

	// Creamos un objeto con todos los datos para enviar al backend
	// Si no hay resultados, devolvemos null
	const createFullAddress = (
		province: string,
		state: string,
		address: string,
		postCode: string,
		result: any[] = []
	): createAddressUserSchema | null => {
		if (result.length > 0) {
			const { lat, lng } = result[0].geometry.location;
			return {
				province,
				state,
				address,
				postCode,
				lat,
				lon: lng,
				user: user?.id,
			};
		}
		return null;
	};

	const onSubmit = (data: AdressFormData) => {
		const location = `${data.province}, ${data.state}, ${data.address}`;
		// Primero obtenemos lat y lon desde georef
		addressGeoref.mutateAsync(
			{ location },
			{
				onSuccess: async (res) => {
					// Si tenemos resultados, creamos la dirección completa y le enviamos los datos a createFullAddress para que arme el objeto de dirección
					const fullAddress = createFullAddress(data.province, data.state, data.address, data.postalCode, res?.data.results);
					// Se verifica que exista un usuario logueado y que exista el token de inicio de sesión.
					if (user?.id !== undefined && token !== null) {
						// Creamos la direccion del usuario
						await createUser.mutateAsync({ fullAddress, userId: user.id, token });
					}
				},
			}
		);
	};

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
					<SearchState
						states={states} // array de resultados
						value={watch('state') || ''} // valor actual del input
						onChange={(val) => setValue('state', val)} // actualizar el form
						disabled={!watch('province')} // deshabilitar si no hay provincia
					/>
					{errors.state && <p className='text-sm text-red-500'>{errors.state.message}</p>}
				</div>

				{/* Calle */}
				<div className='flex flex-col'>
					<label className='block text-md text-gray-700 font-bold pl-2'>Calle</label>
					<Input placeholder='Av General Jose de San Martin' disabled={!watch('state')} {...register('address')} />
					{errors.address && <p className='text-sm text-red-500'>{errors.address.message}</p>}
				</div>

				{/* Código Postal */}
				<div>
					<label className='block text-md text-gray-700 font-bold pl-2'>Código Postal</label>
					<Input placeholder='1884' {...register('postalCode')} disabled={!watch('state')} />
					{errors.postalCode && <p className='text-sm text-red-500'>{errors.postalCode.message}</p>}
				</div>

				{/* País */}
				<div>
					<label className='block text-md text-gray-700 font-bold pl-2'>País</label>
					<Input disabled {...register('country')} />
				</div>

				<div className='flex justify-end'>
					{/* Corregir defasaje del loader dentro del boton */}
					<Button variant='success' type='submit' className='mt-4' disabled={addressGeoref.isPending || createUser.isPending}>
						{addressGeoref.isPending || createUser.isPending ? <Loading /> : 'Guardar dirección'}
					</Button>
				</div>
			</form>
		</section>
	);
});
export default AdressForm;
