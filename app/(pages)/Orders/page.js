import OrdersClient from "./OrdersClient"
export const revalidate = 0
const apiUrl = process.env.NODE_ENV === 'production' ? process.env.APP_BASE_URL : 'http://localhost:3001';

const fetchOrders = async () => {
	try {
		const response = await fetch(`${apiUrl}/api/getOrders`, {
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


const Orders = async () => {
	const { Orders } = await fetchOrders();

	return (
		<OrdersClient Orders={Orders} />
	)
}

export default Orders
