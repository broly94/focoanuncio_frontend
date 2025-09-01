'use client';
import { LocateFixed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/hooks/use-auth';
import { useGetAdressUserById } from '@/hooks/use-user';
import { useAuthStore } from '@/lib/store/auth-store';

export default function CurrentLocation() {
	// Estado para verificar si ya se obtuvo la ubicación
	const [hasLocation, setHasLocation] = useState(false);
	// Estado para verificar si el usuario ha declinado compartir su ubicación
	const [declined, setDeclined] = useState(false);

	const { data: user } = useCurrentUser();
	const token = useAuthStore((state) => state.token);
	const { data: adressUser } = useGetAdressUserById(user?.id, token);

	// Hay que verificar primero si el usuario esta logueado, si lo está, hay que verificar si ya tiene una dirección guardada, si no esta logueado, mostrar el boton de usar mi ubicación actual
	// Si el usuario ya tiene una dirección guardada, mostrar la dirección guardada

	if (user && adressUser && adressUser.length > 0) {
		return (
			<p className=''>
				Ubicación actual {adressUser.country} {adressUser.state}
			</p>
		);
	}

	useEffect(() => {
		const lat = localStorage.getItem('user_lat');
		const lon = localStorage.getItem('user_lon');
		const declinedFlag = localStorage.getItem('locationDeclined');

		if (lat && lon) setHasLocation(true);
		if (declinedFlag) setDeclined(true);
	}, []);

	const handleLocation = () => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const { latitude, longitude } = pos.coords;
				localStorage.setItem('user_lat', latitude.toString());
				localStorage.setItem('user_lon', longitude.toString());
				localStorage.setItem('locationAccepted', 'true');
				setHasLocation(true);
			},
			(err) => {
				console.error('User denied location:', err);
				localStorage.setItem('locationDeclined', 'true');
				setDeclined(true);
			}
		);
	};

	if (hasLocation) {
		return <p className='text-sm text-violet-700 pt-10'>Usando tu ubicación actual 📍</p>;
	}

	return (
		<Button size='lg' variant='secondary' className='mt-6' onClick={handleLocation}>
			<LocateFixed className='h-5 w-5 text-slate-500 mr-2' />
			Usar mi ubicación actual
		</Button>
	);
}
