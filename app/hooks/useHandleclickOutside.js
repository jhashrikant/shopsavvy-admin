'use client'
import { useEffect } from "react";

export const useHandleclickOutside = (ref, setterfunction) => {

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (ref.current && event && !ref.current.contains(event.target)) {
            setterfunction(false)
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [ref])
}