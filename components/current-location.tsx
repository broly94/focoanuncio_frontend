'use client';
import { LocateFixed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/hooks/use-auth';
import { useGetAdressUserById } from '@/hooks/use-user';
import { useAuthStore } from '@/lib/store/auth-store';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { getAddressGeoRefWithCoords } from '@/hooks/use-location';

export default function CurrentLocation() {
	const [isClient, setIsClient] = useState(false);
	const [hasLocation, setHasLocation] = useState(false);
	const [declined, setDeclined] = useState(false);

	// Usar el hook seguro de localStorage
	const [userLat, setUserLat, isLatLoaded] = useLocalStorage<string | null>('user_lat', null);
	const [userLon, setUserLon, isLonLoaded] = useLocalStorage<string | null>('user_lon', null);
	const [locationDeclined, setLocationDeclined, isDeclinedLoaded] = useLocalStorage<boolean>('locationDeclined', false);

	const token = useAuthStore((state) => state.token);
	const { data: user, isLoading: userLoading, error: userError, isError: isUserError } = useCurrentUser();

	const { data: goeRefWithCoords, mutateAsync } = getAddressGeoRefWithCoords();

	const {
		data: adressUser,
		isLoading: addressLoading,
		error: addressError,
		isError: isAddressError,
	} = useGetAdressUserById(user?.id, token);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (isLatLoaded && isLonLoaded && isDeclinedLoaded) {
			if (userLat && userLon) setHasLocation(true);
			if (locationDeclined) setDeclined(true);
		}
	}, [isLatLoaded, isLonLoaded, isDeclinedLoaded, userLat, userLon, locationDeclined]);

	useEffect(() => {
		if (isUserError || isAddressError) {
			console.error('Error de autenticación:', userError || addressError);
		}
	}, [isUserError, isAddressError, userError, addressError]);

	// ⚠️ Evitar renderizado hasta que sepamos si estamos en cliente
	if (!isClient) {
		return (
			<div className='text-sm'>
				<div className='animate-pulse bg-gray-200 h-4 w-32 rounded'></div>
			</div>
		);
	}

	if (userLoading) {
		return <div className='text-sm'>Verificando usuario...</div>;
	}

	if (user && adressUser && adressUser.country) {
		return (
			<p className='text-sm'>
				Ubicación actual: {adressUser.country} {adressUser.state}
			</p>
		);
	}

	if (user && addressLoading) {
		return <div className='text-sm'>Verificando dirección...</div>;
	}

	const handleLocation = (e: any) => {
		e.preventDefault();
		if (!navigator.geolocation) {
			alert('Tu navegador no soporta geolocalización');
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const { latitude, longitude } = pos.coords;
				setUserLat(latitude.toString());
				setUserLon(longitude.toString());
				setLocationDeclined(false);
				setHasLocation(true);
				setDeclined(false);
				mutateAsync({ lat: latitude, lng: longitude });
				console.log(goeRefWithCoords);
			},
			(err) => {
				console.error('Error obteniendo ubicación:', err);
				setLocationDeclined(true);
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

	if (isUserError) {
		return (
			<Button size='lg' variant='secondary' className='' onClick={handleLocation}>
				<LocateFixed className='h-5 w-5 mr-2' />
				Usar mi ubicación actual
			</Button>
		);
	}

	if (hasLocation) {
		return <p className='text-sm pt-2 text-zinc-50'>Usando tu ubicación actual 📍</p>;
	}

	if (declined) {
		return (
			<div className='mt-6'>
				<p className='text-sm text-red-500 mb-2'>Has denegado el acceso a tu ubicación</p>
				<Button size='lg' variant='secondary' onClick={(e) => handleLocation(e)}>
					Intentar nuevamente
				</Button>
			</div>
		);
	}

	return (
		<Button size='sm' variant='secondary' className='bg-transparent underline hover:bg-brand-700' onClick={handleLocation}>
			<LocateFixed className='h-5 w-5 mr-1' />
			Usar mi ubicación actual
		</Button>
	);
}
