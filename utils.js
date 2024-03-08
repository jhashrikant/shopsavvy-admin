
import homeimg from './images/Navbar Icon.png'
import Orders from './images/Orders.png'
import Delivery from './images/Delivery.png'
import { ShoppingCart } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';


const NAV_ITEMS = [
	{
		id: 1,
		href: '/',
		label: 'Dashboard',
		imgPath: homeimg
	},
	{
		id: 2,
		href: '/categories',
		label: 'Categories',
		imgPath: <LayoutDashboard />
	},
	{
		id: 3,
		href: '/Orders',
		label: 'Orders',
		imgPath: Orders
	},
	{
		id: 4,
		href: '/Products',
		label: 'Products',
		imgPath: Delivery
	},
	{
		id: 5,
		href: '/Addproducts',
		label: 'Add Products',
		imgPath: <ShoppingCart />
	},

]

const sizes = [
	{
		id: 1,
		size: 'XS'
	},
	{
		id: 2,
		size: 'S'
	},
	{
		id: 3,
		size: 'M'
	},
	{
		id: 4,
		size: 'L'
	},
	{
		id: 5,
		size: 'XL'
	},
	{
		id: 6,
		size: 'XXL'
	},
]


const debounce = (callbackfn, delay) => {
	let timer;
	return (...args) => {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			callbackfn(...args)
		}, delay);
	}
}

export { NAV_ITEMS, sizes, debounce };

