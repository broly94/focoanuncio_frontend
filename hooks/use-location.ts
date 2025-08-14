'use client';

import { useQuery } from '@tanstack/react-query';
import { ApiLocation } from '@/lib/api/locations.api';

interface LocationSuggestion {
	province: string;
	locality: string;
	id: string;
}

enum Countries {
	Argentina = 'Argentina',
}

interface Provinces {
	province_id: string;
	name: string;
	country: Countries;
}

// Función para obtener sugerencias de ubicación
const fetchLocationSuggestions = async (query: string): Promise<LocationSuggestion[]> => {
	// En una aplicación real, esto sería una llamada a una API
	// Por ahora, simulamos una respuesta con datos de ejemplo
	await new Promise((resolve) => setTimeout(resolve, 300));

	if (!query || query.length < 2) return [];

	// Datos de ejemplo para Argentina
	const locations = [
		{ province: 'Buenos Aires', locality: 'Capital Federal', id: 'bsas-cf' },
		{ province: 'Buenos Aires', locality: 'La Plata', id: 'bsas-lp' },
		{ province: 'Buenos Aires', locality: 'Mar del Plata', id: 'bsas-mdp' },
		{ province: 'Buenos Aires', locality: 'Quilmes', id: 'bsas-quilmes' },
		{ province: 'Córdoba', locality: 'Córdoba Capital', id: 'cba-capital' },
		{ province: 'Córdoba', locality: 'Villa Carlos Paz', id: 'cba-vcp' },
		{ province: 'Córdoba', locality: 'Río Cuarto', id: 'cba-rc' },
		{ province: 'Santa Fe', locality: 'Rosario', id: 'sf-rosario' },
		{ province: 'Santa Fe', locality: 'Santa Fe Capital', id: 'sf-capital' },
		{ province: 'Mendoza', locality: 'Mendoza Capital', id: 'mza-capital' },
		{ province: 'Mendoza', locality: 'San Rafael', id: 'mza-sr' },
		{ province: 'Tucumán', locality: 'San Miguel de Tucumán', id: 'tuc-smt' },
		{ province: 'Entre Ríos', locality: 'Paraná', id: 'er-parana' },
		{ province: 'Salta', locality: 'Salta Capital', id: 'salta-capital' },
		{ province: 'Chaco', locality: 'Resistencia', id: 'chaco-resistencia' },
		{ province: 'Misiones', locality: 'Posadas', id: 'misiones-posadas' },
		{ province: 'Corrientes', locality: 'Corrientes Capital', id: 'corrientes-capital' },
		{ province: 'Santiago del Estero', locality: 'Santiago Capital', id: 'sde-capital' },
		{ province: 'San Juan', locality: 'San Juan Capital', id: 'sj-capital' },
		{ province: 'Jujuy', locality: 'San Salvador de Jujuy', id: 'jujuy-capital' },
	];

	// Filtrar por la consulta
	const lowercaseQuery = query.toLowerCase();
	return locations.filter(
		(location) => location.province.toLowerCase().includes(lowercaseQuery) || location.locality.toLowerCase().includes(lowercaseQuery)
	);
};

// Hook para obtener sugerencias de ubicación
export function useLocationSuggestions(query: string) {
	return useQuery({
		queryKey: ['locationSuggestions', query],
		queryFn: () => fetchLocationSuggestions(query),
		enabled: query.length >= 2,
	});
}

export function useProvinces() {
	return useQuery({
		queryKey: ['provinces'],
		queryFn: async () => {
			const response = await ApiLocation.getProvinces();
			return response;
		},
	});
}
