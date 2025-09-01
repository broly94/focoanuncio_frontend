import api from '@/lib/axios';
import axios from 'axios';

export class ApiLocation {
	static async getProvinces() {
		try {
			const response = await api.get(`/locations/provinces`);
			return response.data;
		} catch (error: any) {
			const errorMessage = error.response?.data?.message.split(' :: ')[1] || 'Error al registrar';
			throw new Error(errorMessage);
		}
	}

	static async getLocalities(provinceId: string, query: string) {
		try {
			const response = await api.get(`/locations/municipalities-by-province`, {
				params: {
					provinceId,
					query,
				},
			});
			return response.data;
		} catch (error: any) {
			const errorMessage = error.response?.data?.message.split(' :: ')[1] || 'Error al registrar';
			throw new Error(errorMessage);
		}
	}

	static async getAdressGeoRef(location: string) {
		try {
			return await api.get(`/google-maps/get-location-text-plain?address=${encodeURIComponent(location)}`);
		} catch (error: any) {
			const errorMessage = error.response?.data?.message.split(' :: ')[1] || 'Error al registrar';
			throw new Error(errorMessage);
		}
	}
}
