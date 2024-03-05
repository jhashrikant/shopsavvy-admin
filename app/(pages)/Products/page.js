import ProductClient from "./ProductClient";
export const revalidate = 0

const apiUrl = process.env.NODE_ENV === 'production' ? process.env.APP_BASE_URL : 'http://localhost:3001';

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

const Products = async () => {
    const response = await fetchAllproducts();
    const products = response?.products

    return (
        <ProductClient products={products} />
    )
};
export default Products;
