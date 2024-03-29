//server component
import CategoriesClient from "./CategoriesClient"
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

const Categories = async () => {

	const data = await fetchCategories();
	const Categories = data?.navItems
	return (
		<CategoriesClient Categories={Categories} />
	)
}

export default Categories
