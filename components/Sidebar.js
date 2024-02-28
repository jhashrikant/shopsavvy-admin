'use client'
import Image from 'next/image'
import React from 'react';
import { NAV_ITEMS } from '../utils'
import headerimg from '../images/headerimg.png'
import Link from 'next/link'

const Sidebar = ({ Isactive ,OpenAndCloseHamburger}) => {

    // const navref = useRef();

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (navref.current && !navref.current.contains(event?.target)) {
    //             OpenAndCloseHamburger();
    //         }
    //     };
    //     document.addEventListener('mousedown', handleClickOutside);
    //     // Remove event listener when the component unmounts
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };

    // }, [navref])

    return (
        <div  className={`leftpanel ${Isactive ? 'active' : ''}`}>
            <div className='mainNavCOntainer'>
                <header className='header'>
                    {/* <Image className='headerImg' src={headerimg} alt='headerimg' /> */}
                    <aside className='aside'>
                        <h1>ShopsavvyAdmin</h1>
                        <Link href={'https://shopsavvy-store.vercel.app/'} className='visitStore'>visit store</Link>
                    </aside>
                    
                </header>

                <nav className='navLinks'>
                    <ul>
                        {NAV_ITEMS && NAV_ITEMS?.map((navItems) => (
                            <li key={navItems.id} className='hover:cursor-pointer  space-x-3 '>
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
