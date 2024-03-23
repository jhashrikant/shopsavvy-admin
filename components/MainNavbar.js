'use client'
import { Menu, XCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { useHandleclickOutside } from '@/app/hooks/useHandleclickOutside'

const MainNavbar = ({ setOpenmenu, openmenu, toggleMenu, Isactive, OpenAndCloseHamburger }) => {

	const profileref = useRef()

	useHandleclickOutside(profileref, setOpenmenu) //call the custom hook at the top to check if we clicked outside of reference

	return (
		<nav className='Nav sm:gap-4 gap-2 sm:px-8 px-4 py-3 border-b border-[#D9D9D9] sticky top-0 bg-[#FFFFFF] z-10 '>
			<div className='section1'>
				{Isactive ? <XCircle className='closeIcon' onClick={OpenAndCloseHamburger} /> : <Menu onClick={OpenAndCloseHamburger} className='hamburgerIcon' />}
				<h1 className='font-bold text-xl'>Shopsavvy Admin</h1>
			</div>

			<div ref={profileref} className="dropdown ml-3">
				<button type="button" className="dropdown-toggle flex items-center" onClick={() => toggleMenu()}>
					<div className="flex-shrink-0 w-10 h-10 relative">
						<div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
							<Image width={100} height={100} className="w-8 h-8 rounded-full" src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg" alt="" />
							<div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
							<div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
						</div>
					</div>
					<div className="p-2 md:block text-left">
						<h2 className="text-sm font-semibold text-gray-800">Shrikant Jha</h2>
						<p className="text-xs text-gray-500">Administrator</p>
					</div>
				</button>
				{openmenu && (
					<ul className="dropdown-menu absolute top-0 right-0 mt-16 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
						<li>
							<Link className='block px-4 py-2 text-gray-800 hover:bg-gray-100' href="/Profile">
								Profile
							</Link>
						</li>
						<li>
							<Link className='block px-4 py-2 text-gray-800 hover:bg-gray-100' href="/MyOrders">
								Settings
							</Link>
						</li>
						<li>
							<button className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 focus:outline-none" type="submit">Logout</button>
						</li>
					</ul>
				)}
			</div>
		</nav>
	)
}

export default MainNavbar
