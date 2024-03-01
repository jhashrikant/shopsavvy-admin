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

export const revalidate = 0 
const OrdersClient = ({ Orders }) => {

    return (
        <>
        <h2 className="mt-5 ml-5 mb-5 font-bold text-2xl">Orders({Orders.length})</h2>
            {Orders.length == 0 ? <div>No orders has been placed yet</div> :
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
                        {Orders?.map((orderdata, index) => (
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
                </Table>}
        </>
    )
}
export default OrdersClient
