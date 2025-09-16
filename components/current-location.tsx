'use client';
import { LocateFixed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/hooks/use-auth';
import { useGetAdressUserById } from '@/hooks/use-user';
import { useAuthStore } from '@/lib/store/auth-store';

export default function CurrentLocation() {
	const [hasLocation, setHasLocation] = useState(false);
	const [declined, setDeclined] = useState(false);

	const token = useAuthStore((state) => state.token);
	const { data: user, isLoading: userLoading, error: userError, isError: isUserError } = useCurrentUser();

	// Solo ejecutar esta query si hay usuario Y token válido
	const {
		data: adressUser,
		isLoading: addressLoading,
		error: addressError,
		isError: isAddressError,
	} = useGetAdressUserById(user?.id, token);

	useEffect(() => {
		const lat = localStorage.getItem('user_lat');
		const lon = localStorage.getItem('user_lon');
		const declinedFlag = localStorage.getItem('locationDeclined');

		if (lat && lon) setHasLocation(true);
		if (declinedFlag) setDeclined(true);
	}, []);

	// Manejar errores de autenticación
	useEffect(() => {
		if (isUserError || isAddressError) {
			console.error('Error de autenticación:', userError || addressError);
			// Opcional: limpiar token inválido
			// useAuthStore.getState().setToken(null);
		}
	}, [isUserError, isAddressError, userError, addressError]);

	// Mostrar loading mientras se verifican los datos
	if (userLoading) {
		return <div className='text-sm text-gray-500'>Verificando usuario...</div>;
	}

	// Si hay usuario logueado Y tiene dirección guardada
	if (user && adressUser && adressUser.country) {
		return (
			<p className='text-sm pt-5'>
				Ubicación actual: {adressUser.country} {adressUser.state}
			</p>
		);
	}

	// Si hay usuario pero no tiene dirección, mostrar loading mientras se verifica
	if (user && addressLoading) {
		return <div className='text-sm text-gray-500'>Verificando dirección...</div>;
	}

	const handleLocation = () => {
		if (!navigator.geolocation) {
			alert('Tu navegador no soporta geolocalización');
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const { latitude, longitude } = pos.coords;
				localStorage.setItem('user_lat', latitude.toString());
				localStorage.setItem('user_lon', longitude.toString());
				localStorage.setItem('locationAccepted', 'true');
				setHasLocation(true);
				setDeclined(false);
			},
			(err) => {
				console.error('Error obteniendo ubicación:', err);
				localStorage.setItem('locationDeclined', 'true');
				setDeclined(true);
				setHasLocation(false);
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 60000,
			}
		);
	};

	// Si hay error de autenticación, mostrar botón de ubicación sin datos de usuario
	if (isUserError) {
		return (
			<Button size='lg' variant='secondary' className='mt-6' onClick={handleLocation}>
				<LocateFixed className='h-5 w-5 text-slate-500 mr-2' />
				Usar mi ubicación actual
			</Button>
		);
	}

	if (hasLocation) {
		return <p className='text-sm pt-5'>Usando tu ubicación actual 📍</p>;
	}

	if (declined) {
		return (
			<div className='mt-6'>
				<p className='text-sm text-red-500 mb-2'>Has denegado el acceso a tu ubicación</p>
				<Button size='lg' variant='secondary' onClick={handleLocation}>
					Intentar nuevamente
				</Button>
			</div>
		);
	}

	return (
		<Button size='lg' variant='secondary' className='mt-6' onClick={handleLocation}>
			<LocateFixed className='h-5 w-5 text-slate-500 mr-2' />
			Usar mi ubicación actual
		</Button>
	);
}
