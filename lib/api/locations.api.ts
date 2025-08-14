import axios from 'axios';

export class ApiLocation {
	static async getProvinces() {
		try {
			const response = await axios.get(`http://localhost:3002/api/locations/provinces`);
			return response.data;
		} catch (error: any) {
			const errorMessage = error.response?.data?.message.split(' :: ')[1] || 'Error al registrar';
			throw new Error(errorMessage);
		}
	}
}
