import api from '@/lib/axios';

export class ApiUser {
	static async login(email: string, password: string) {
		try {
			const resposne = await api.post('/auth/login', { email, password });
			return resposne.data;
		} catch (error: any) {
			console.log(error);
			const errorMessage = error.response?.data?.message.split(' :: ')[1] || 'Error al iniciar sesión';
			throw new Error(errorMessage);
		}
	}

	static async register(name: string, lastName: string, phone: string, email: string, password: string) {
		try {
			const response = await api.post('/auth/register', { name, lastName, phone, email, password });
			return response.data;
		} catch (error: any) {
			const errorMessage = error.response?.data?.message.split(' :: ')[1] || 'Error al registrar';
			throw new Error(errorMessage);
		}
	}

	static async getCurrentUser(token: string | null) {
		try {
			const response = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
			return response.data;
		} catch (error: any) {
			console.log(error);
			const errorMessage = error.response?.data?.message.split(' :: ')[1] || 'Error al obtener el usuario actual';
			throw new Error(errorMessage);
		}
	}

	//Terminar
	static async getAdressByUserId(userId: number) {
		try {
			const response = await api.get;
		} catch (error: any) {
			console.log(error);
			const errorMessage = error.response?.data?.message.split(' :: ')[1] || 'Error al obtener la dirección del usuario';
			throw new Error(errorMessage);
		}
	}
}
