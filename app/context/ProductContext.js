"use client"
import { createContext, useContext, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {

	const [formdata, setformdata] = useState({
		Product_name: '',
		slug: '',
		images: [],
		price: '',
		category: '',
		size: '',
		qty: '',
		description: ''
	})
	const [Isediting, setIsediting] = useState(false)
	const [productid, setproductId] = useState('')

	return (
		<ProductContext.Provider value={{ formdata, setformdata, Isediting, setIsediting, productid, setproductId }}>
			{children}
		</ProductContext.Provider>
	)
}

export const useProductContext = () => {
	return useContext(ProductContext)
}

