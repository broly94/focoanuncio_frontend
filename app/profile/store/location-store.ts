import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

type LocationState = {
	provinceSelected: string;
	setProvinceSelected: (province: string) => void;
	localitySelected: string;
	setLocalitySelected: (locality: string) => void;
	address: string;
	setAddress: (address: string) => void;
	postalCode: string;
	setPostalCode: (postalCode: string) => void;
};

export const useLocationStore = create<LocationState>()(
	devtools(
		(set) => ({
			provinceSelected: '',
			setProvinceSelected: (province) => set({ provinceSelected: province }),
			localitySelected: '',
			setLocalitySelected: (locality) => set({ localitySelected: locality }),
			address: '',
			setAddress: (address) => set({ address }),
			postalCode: '',
			setPostalCode: (postalCode) => set({ postalCode }),
		}),
		{
			name: 'location-storage', //
		}
	)
);
