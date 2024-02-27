
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
        href: '/Orders',
        label: 'Orders',
        imgPath: Orders
    },
    {
        id: 3,
        href: '/Addproducts',
        label: 'Add Products',
        imgPath: <ShoppingCart />
    },
    {
        id: 4,
        href: '/Products',
        label: 'Products',
        imgPath: Delivery
    },
    {
        id: 5,
        href: '/categories',
        label: 'Categories',
        imgPath: <LayoutDashboard />
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

export { NAV_ITEMS, sizes };
