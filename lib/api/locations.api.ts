import api from '@/lib/axios';

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
}
