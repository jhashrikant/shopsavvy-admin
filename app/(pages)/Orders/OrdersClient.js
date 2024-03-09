"use client";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { debounce } from "@/utils";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input"

const OrdersClient = ({ Orders }) => {

	const [query, setquery] = useState('')
	const [filteredOrders, setfilteredOrders] = useState([])
	const [isdebounceCompleted, setisdebounceCompleted] = useState(false)

	const searchOrdersByname = (querysearched) => {
		if (querysearched === '') {
			setfilteredOrders([])
			setisdebounceCompleted(false)
			return;
		}
		const filtered = Orders.filter((order) => {
			return (
				order.products.some((item) => item.Product_name.toLowerCase().includes(querysearched.toLowerCase()))
			)
		})
		setfilteredOrders(filtered)
		setisdebounceCompleted(true)
	}

	console.log(isdebounceCompleted)

	console.log(filteredOrders)

	const debouncedfn = useCallback(debounce(searchOrdersByname, 300), [])

	useEffect(() => {
		debouncedfn(query)
	}, [query])

	return (
		<>
			<div className="flex justify-between items-center">
				<h2 className="mt-5 ml-5 mb-5 font-bold text-2xl">Orders({isdebounceCompleted && filteredOrders.length === 0 && query !== '' ? 0 : filteredOrders.length !== 0 ? filteredOrders.length : Orders.length})</h2>
				<Input value={query} onChange={(event) => setquery(event.target.value)} type="text" placeholder="Search Orders By Product name" />
			</div>
			{Orders.length == 0 && <div>No orders has been received yet</div>}
			<Table>
				<TableCaption>A list of your recent Orders.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Name</TableHead>
						<TableHead className="w-[100px]">Product</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead>Address</TableHead>
						<TableHead className="text-right">Size</TableHead>
						<TableHead className="text-right">quantity</TableHead>
						<TableHead className="text-right">TotalPrice</TableHead>
						<TableHead className="text-right">paid</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isdebounceCompleted && filteredOrders.length === 0 && query !== '' ?
						<TableRow>
							<TableCell colSpan={8} className="text-center">No results could be found</TableCell>
						</TableRow> :
						filteredOrders.length === 0 ?
							Orders?.map((orderdata, index) => (
								<TableRow key={index}>
									<TableCell className="font-medium">{orderdata?.name}</TableCell>
									<TableCell className="font-medium">{orderdata?.products?.map(item => item?.Product_name).join("/ ")}</TableCell>
									<TableCell>{orderdata.phone}</TableCell>
									<TableCell>{orderdata.address}</TableCell>
									<TableCell className="text-right">{orderdata?.products?.map(item => item?.size).join("/ ")}</TableCell>
									<TableCell className="text-right">{orderdata?.products?.map(item => item?.quantity).join("/ ")}</TableCell>
									<TableCell className="text-right">{orderdata.totalAmount}</TableCell>
									<TableCell className="text-right">{orderdata?.paymentStatus ? "true" : "false"}</TableCell>
								</TableRow>

							)) : filteredOrders.map((orderdata, index) => (
								<TableRow key={index}>
									<TableCell className="font-medium">{orderdata?.name}</TableCell>
									<TableCell className="font-medium">{orderdata?.products?.map(item => item?.Product_name).join("/ ")}</TableCell>
									<TableCell>{orderdata.phone}</TableCell>
									<TableCell>{orderdata.address}</TableCell>
									<TableCell className="text-right">{orderdata?.products?.map(item => item?.size).join("/ ")}</TableCell>
									<TableCell className="text-right">{orderdata?.products?.map(item => item?.quantity).join("/ ")}</TableCell>
									<TableCell className="text-right">{orderdata.totalAmount}</TableCell>
									<TableCell className="text-right">{orderdata?.paymentStatus ? "true" : "false"}</TableCell>
								</TableRow>
							))}
				</TableBody>
			</Table >
		</>
	)
}
export default OrdersClient
