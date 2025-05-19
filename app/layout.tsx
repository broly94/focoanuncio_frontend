import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Estrategias de Marketing',
	description: 'Plataforma para encontrar y crear estrategias de marketing para tu negocio',
	generator: 'v0.dev',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='es'>
			<body className={inter.className}>
				<Providers>
					<div className='flex flex-col min-h-screen'>
						<Header />
						<div className='flex-grow'>{children}</div>
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}
