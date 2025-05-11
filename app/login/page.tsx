'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { showToast } from 'nextjs-toast-notify';

// Esquema de validación con Zod
const loginSchema = z.object({
	email: z.string().email('Ingresa un email válido'),
	password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
	rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const { toast } = useToast();
	const login = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
	});

	const onSubmit = async (data: LoginFormValues) => {
		try {
			await login.mutateAsync({
				email: data.email,
				password: data.password,
			});

			router.push('/');
		} catch (error: any) {
			showToast.error(`${error.message}`, {
				duration: 4000,
				progress: false,
				position: 'top-center',
				transition: 'bounceIn',
				icon: '',
				sound: true,
			});
		}
	};

	return (
		<div className='max-w-md mx-auto px-4 py-12'>
			<div className='text-center mb-8'>
				<h1 className='text-3xl font-bold'>Iniciar Sesión</h1>
				<p className='text-gray-600 mt-2'>Accede a tu cuenta para gestionar tus estrategias</p>
			</div>

			<div className='bg-white rounded-xl shadow-sm p-6'>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							placeholder='tu@email.com'
							{...register('email')}
							aria-invalid={errors.email ? 'true' : 'false'}
						/>
						{errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
					</div>

					<div className='space-y-2'>
						<Label htmlFor='password'>Contraseña</Label>
						<div className='relative'>
							<Input
								id='password'
								type={showPassword ? 'text' : 'password'}
								placeholder='••••••••'
								{...register('password')}
								aria-invalid={errors.password ? 'true' : 'false'}
							/>
							<button
								type='button'
								className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
							</button>
						</div>
						{errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
					</div>

					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-2'>
							<Checkbox id='rememberMe' {...register('rememberMe')} />
							<Label htmlFor='rememberMe' className='text-sm'>
								Recordarme
							</Label>
						</div>
						<Link href='/forgot-password' className='text-sm text-emerald-600 hover:text-emerald-800'>
							¿Olvidaste tu contraseña?
						</Link>
					</div>

					<Button type='submit' className='w-full' disabled={isSubmitting}>
						{isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
					</Button>
				</form>

				<div className='mt-6 text-center'>
					<p className='text-sm text-gray-600'>
						¿No tienes una cuenta?{' '}
						<Link href='/register' className='text-emerald-600 hover:text-emerald-800 font-medium'>
							Regístrate
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
