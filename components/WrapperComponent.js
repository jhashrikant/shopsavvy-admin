// import React from 'react'
"use client";
import Sidebar from './Sidebar'
import MainNavbar from './MainNavbar'
import { useState } from 'react';

const WrapperComponent = ({ children }) => {

	const [Isactive, setIsActive] = useState(false)

	const OpenAndCloseHamburger = () => {
		setIsActive((prevState) => !prevState)
	}

	const [openmenu, setOpenmenu] = useState(false);

	const toggleMenu = () => {
		setOpenmenu((prevmenu) => !prevmenu);
	};
	
	return (
		<div className='MainContainer'>
			<Sidebar setIsActive={setIsActive} OpenAndCloseHamburger={OpenAndCloseHamburger} Isactive={Isactive} />
			<div className='main'>
				<MainNavbar setOpenmenu={setOpenmenu} openmenu={openmenu} toggleMenu={toggleMenu} Isactive={Isactive} OpenAndCloseHamburger={OpenAndCloseHamburger} />
				{children}
			</div>
		</div>
	)
}

export default WrapperComponent
