import OrdersClient from "./OrdersClient"

const fetchOrders = async () => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/getOrders`, {
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
