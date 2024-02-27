'use client';
import { useState } from "react";

const useHamburger = () => {
    const [Isactive, setIsActive] = useState(false);

    function OpenAndCloseHamburger() {
        setIsActive((prevState) => !prevState);
    }
    return { Isactive, OpenAndCloseHamburger };
}
export default useHamburger;