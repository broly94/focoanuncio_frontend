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

	const { data: user } = useCurrentUser();
	const token = useAuthStore((state) => state.token);
	const { data: userAdress } = useGetAdressUserById(user?.id, token);

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
		<Button size='lg' variant='default' className='border-white text-white bg-violet-700 mt-6 hover:bg-violet-500' onClick={handleLocation}>
			<LocateFixed className='h-5 w-5 text-white mr-2 flex-shrink-0' />
			Usar mi ubicación actual
		</Button>
	);
}
