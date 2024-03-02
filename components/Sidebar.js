'use client'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react';
import { NAV_ITEMS } from '../utils'
import Link from 'next/link'
import { useHandleclickOutside } from '@/app/hooks/useHandleclickOutside';

const Sidebar = ({ setIsActive, Isactive, OpenAndCloseHamburger }) => {

    const navref = useRef();
    useHandleclickOutside(navref, setIsActive)//call the custom hook at the top to check if we clicked outside of reference


    return (
        <div className={`leftpanel ${Isactive ? 'active' : ''}`}>
            <div className='mainNavCOntainer'>
                <header className='header'>
                    <div className='aside'>
                        <h1>ShopsavvyAdmin</h1>
                        <Link href={'https://shopsavvy-store.vercel.app/'} target="_blank" rel="noopener noreferrer" className='visitStore'>visit store</Link>
                    </div>
                </header>

                <nav ref={navref} className='navLinks'>
                    <ul>
                        {NAV_ITEMS && NAV_ITEMS?.map((navItems) => (
                            <li onClick={() => Isactive ? OpenAndCloseHamburger() : null} key={navItems.id} className='hover:cursor-pointer  space-x-3 '>
                                <Link className='NavItems' href={navItems.href}>
                                    {React.isValidElement(navItems?.imgPath) ? navItems.imgPath : <Image className='homeImg' src={navItems?.imgPath} alt='homeimg' />}
                                    <h1 className='item '>{navItems?.label}</h1>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
