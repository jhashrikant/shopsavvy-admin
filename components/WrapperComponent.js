// import React from 'react'
"use client";
import Sidebar from './Sidebar'
import MainNavbar from './MainNavbar'
import { useState } from 'react';

const WrapperComponent = ({ children }) => {

    const [Isactive, setIsActive] = useState(false)

    function OpenAndCloseHamburger() {
        // e.stopPropagation()
        console.log('sdsds')
        setIsActive((prevState) => !prevState)
    }

    const [openmenu, setOpenmenu] = useState(false);

    const toggleMenu = () => {
        // e.stopPropagation()
        console.log('sss')
        setOpenmenu(prevmenu => !prevmenu);
    };
    return (
        <div className='MainContainer'>
            <Sidebar OpenAndCloseHamburger={OpenAndCloseHamburger} Isactive={Isactive} />
            <div className='main'>
                <MainNavbar openmenu={openmenu} toggleMenu={toggleMenu} Isactive={Isactive} OpenAndCloseHamburger={OpenAndCloseHamburger} />
                {children}
            </div>
        </div>
    )
}

export default WrapperComponent
