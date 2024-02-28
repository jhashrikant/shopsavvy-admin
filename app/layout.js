import { Inter } from 'next/font/google'
import './globals.css'
import { ProductProvider } from './context/ProductContext'
import WrapperComponent from '@/components/WrapperComponent'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'ShopsavvyAdmin',
	description: 'ShopsavvyAdmin',
}

export default function RootLayout({ children }) {

	return (
		<html lang="en">
			<body className={inter.className}>
				<ProductProvider>
					<WrapperComponent>
						{children}
					</WrapperComponent>
				</ProductProvider>
			</body>
		</html>
	)
}
