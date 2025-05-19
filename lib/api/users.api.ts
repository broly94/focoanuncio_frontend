import axios from 'axios';

export class ApiUser {
	async login(email: string, password: string) {
		try {
			const resposne = await axios.post('http://localhost:3002/api/auth/login', { email, password });
			return resposne.data;
		} catch (error: any) {
			console.log(error);
			const errorMessage = error.response?.data?.message.split(' :: ')[1] || 'Error al iniciar sesión';
			throw new Error(errorMessage);
		}
	}

	async register(name: string, lastName: string, phone: string, email: string, password: string) {
		try {
			const response = await axios.post('http://localhost:3002/api/auth/register', { name, lastName, phone, email, password });
			return response.data;
		} catch (error: any) {
			const errorMessage = error.response?.data?.message.split(' :: ')[1] || 'Error al registrar';
			throw new Error(errorMessage);
		}
	}
}
