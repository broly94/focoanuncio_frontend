import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Lato, Mona_Sans, Roboto_Slab } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Providers } from '@/components/providers';
import ValidateUserLogin from '@/components/validate-user-login';

const inter = Inter({ subsets: ['latin'] });
const lato = Mona_Sans({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Estrategias de Marketing',
	description: 'Plataforma para encontrar y crear estrategias de marketing para tu negocio',
	generator: 'v0.dev',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='es'>
			<body className={lato.className}>
				{/* Revisar el validate */}
				<Providers>
					<ValidateUserLogin />
					<div className='flex flex-col min-h-screen'>
						<Header />
						<div className='flex min-h-full w-full justify-center'>{children}</div>
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}
