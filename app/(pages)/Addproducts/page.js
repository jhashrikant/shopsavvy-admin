import Addproductclient from "./Addproductclient"

const fetchCategories = async () => {
	try {
		const response = await fetch(`${process.env.APP_BASE_URL}/api/getNavItems`, {
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

const Addproduct = async () => {
	const data = await fetchCategories();
	const Categories = data?.navItems
	
	return (
		<Addproductclient Categories={Categories} />
	)
}

export default Addproduct
