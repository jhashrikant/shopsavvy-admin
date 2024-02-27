import ProductClient from "./ProductClient";

const fetchAllproducts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/getalloriginalProducts`, {
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
