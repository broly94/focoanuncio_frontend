import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

type LocationState = {
	provinceSelected: string;
	setProvinceSelected: (province: string) => void;
	stateSelected: string;
	setStateSelected: (locality: string) => void;
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
			setStateSelected: (state) => set({ stateSelected: state }),
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
