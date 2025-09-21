'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, SearchCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocationSuggestions } from '@/hooks/use-location';
import CurrentLocation from './current-location';

export default function SearchBar() {
	const router = useRouter();
	const [keyword, setKeyword] = useState('');
	const [location, setLocation] = useState('');
	const [showSuggestions, setShowSuggestions] = useState(false);
	const locationInputRef = useRef<HTMLInputElement>(null);
	const suggestionsRef = useRef<HTMLDivElement>(null);
	const ubicacionContainerRef = useRef<HTMLDivElement>(null);

	// Obtener sugerencias de ubicación
	const { data: suggestions, isLoading } = useLocationSuggestions(location);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams();

		if (keyword) params.append('keyword', keyword);
		if (location) params.append('location', location);

		router.push(`/search?${params.toString()}`);
	};

	// Cerrar las sugerencias cuando se hace clic fuera
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				suggestionsRef.current &&
				!suggestionsRef.current.contains(event.target as Node) &&
				locationInputRef.current &&
				!locationInputRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Seleccionar una sugerencia
	const handleSelectSuggestion = (province: string, locality: string) => {
		setLocation(`${province}, ${locality}`);
		setShowSuggestions(false);
	};

	return (
		<div className='container max-w-4xl mx-auto bg-transparent rounded-lg'>
			<form onSubmit={handleSearch} className='relative'>
				<div className='min-h-44 p-3 relative bg-zinc-800 dark:bg-zinc-900 bg-opacity-30 flex flex-col items-center justify-center py-5 w-full rounded-md shadow-sm dark:border shadow-zinc-400 dark:shadow-zinc-800'>
					<div className='w-full px-5 flex flex-row justify-between items-center'>
						<p className='font-thin text-xs sm:text-sm md:text-md lg:text-lg text-zinc-50'>¿Qué estas buscando?</p>
						<CurrentLocation />
					</div>
					<div className='flex md:flex-row flex-col items-center justify-center w-full m-4 rounded-lg p-2 bg-white relative'>
						<div className='flex justify-center w-full items-center relative ml-2 border-b-2 md:border-b-0 md:border-r-2 border-brand-300 p-2'>
							<SearchCheck className='h-5 w-5 absolute insert-y-0 left-1 ml-1 text-zinc-800' />
							<Input
								className='pl-8 border-none ring-0 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 h-10'
								type='text'
								placeholder='Construcción, Abogado, Cancha de Futbol...'
								value={keyword}
								onChange={(e) => setKeyword(e.target.value)}
							/>
						</div>

						{/* Contenedor con referencia para posicionar las sugerencias */}
						<div ref={ubicacionContainerRef} className='flex flex-col md:flex-row justify-center w-full items-center relative ml-2'>
							<div className='flex justify-center w-full items-center relative'>
								<MapPin className='h-5 w-5 text-zinc-800 absolute insert-y-0 left-0 ml-2' />
								<Input
									className='pl-8 border-none ring-0 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 h-10'
									ref={locationInputRef}
									type='text'
									placeholder='Ubicación'
									value={location}
									onChange={(e) => {
										setLocation(e.target.value);
										setShowSuggestions(true);
									}}
									onFocus={() => setShowSuggestions(true)}
								/>
							</div>

							{/* Botón de búsqueda - Posicionamiento responsive */}
							<div className='flex justify-center mt-4 md:mt-0 md:absolute md:inset-y-0 md:right-0 md:top-1 px-2 w-full md:w-auto'>
								<Button
									type='submit'
									variant='default'
									className='px-6 rounded-md transition-colors duration-200 bg-brand-400 hover:bg-brand-300 w-full md:w-auto'
								>
									<Search className='h-5 w-5' />
									Buscar
								</Button>
							</div>

							{/* Sugerencias de ubicación */}
							{showSuggestions && (
								<div
									ref={suggestionsRef}
									className='absolute z-50 w-full top-[100%] md:top-[140%] left-0 bg-zinc-100 rounded-lg shadow-lg overflow-hidden border border-zinc-600 max-h-60 overflow-y-auto mt-1'
								>
									{isLoading ? (
										<div className='p-3 text-center text-gray-500'>Cargando sugerencias...</div>
									) : suggestions && suggestions.length > 0 ? (
										suggestions.map((suggestion, index) => (
											<div
												key={index}
												className='hover:bg-gray-50 cursor-pointer'
												onClick={() => handleSelectSuggestion(suggestion.province, suggestion.locality)}
											>
												<div className='p-3 border-b border-gray-100 last:border-b-0'>
													<div className='flex flex-col md:flex-row md:justify-between md:items-center'>
														<div className='font-medium text-gray-700'>{suggestion.province}</div>
														<div className='text-sm text-gray-500'>{suggestion.locality}</div>
													</div>
												</div>
											</div>
										))
									) : (
										<div className='p-3 text-center text-gray-500'>
											{location ? 'No se encontraron ubicaciones' : 'Escribe para ver sugerencias'}
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
