"use client"
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext()


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
	const [Products, setProducts] = useState([])


	useEffect(() => {
		const fetchAllproducts = async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/getalloriginalProducts`, { next: { revalidate: 0 } })
			if (!res.ok) {
				throw new Error(`Failed to fetch products. Status: ${res.status}`);
			}
			const { products } = await res.json();
			setProducts(products)
		}
		fetchAllproducts()
	}, [])



	return (
		<ProductContext.Provider value={{ formdata, setformdata, Isediting, setIsediting, productid, setproductId, Products, setProducts }}>
			{children}
		</ProductContext.Provider>
	)
}

