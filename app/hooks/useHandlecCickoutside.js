const useHandleClickOutside = (ref) => {
    if (!ref) return;

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsNavVisible(false);
        }
        // if (profileDropdownref.current && !profileDropdownref.current.contains(event.target)) {
        //     // console.log(profileDropdownref.current.contains(event.target))
        //     setactive(false);
        // }
    };
    document.addEventListener('mousedown', handleClickOutside);
    // Remove event listener when the component unmounts
    // return () => {
    //     document.removeEventListener('mousedown', handleClickOutside);
    // };
}