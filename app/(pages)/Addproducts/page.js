import Addproductclient from "./Addproductclient"
export const revalidate = 0
const apiUrl = process.env.NODE_ENV === 'production' ? process.env.APP_BASE_URL : 'http://localhost:3001';

const fetchCategories = async () => {
	try {
		const response = await fetch(`${apiUrl}/api/getNavItems`, {
			cache: 'no-store'
		});
		if (!response.ok) throw new Error(`Failed to fetch products. Status: ${res.status}`);
		else {
			const data = await response.json();
			return data
		}
	} catch (error) {
		console.log(error)
	}
}

const fetchAllproducts = async () => {
	const res = await fetch(`${apiUrl}/api/getalloriginalProducts`, {
		 cache: 'no-store'
	})
	if (!res.ok) {
		 throw new Error(`Failed to fetch products. Status: ${res.status}`);
	}
	const data = await res.json();
	return data;
}


const Addproduct = async () => {
	const data = await fetchCategories();
	const Categories = data?.navItems

	const response = await fetchAllproducts();
	const products = response?.products
	
	return (
		<Addproductclient products={products} Categories={Categories} />
	)
}

export default Addproduct
