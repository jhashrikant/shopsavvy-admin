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

const OrdersClient = ({ Orders }) => {
    console.log('line 14', Orders)



    return (
        <>
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

        // <Table>
        //     <TableCaption>A list of your recent Orders.</TableCaption>
        //     <TableHeader>
        //         <TableRow>
        //             <TableHead className="w-[100px]">Order ID</TableHead>
        //             <TableHead>Name</TableHead>
        //             <TableHead>Email</TableHead>
        //             <TableHead>Phone</TableHead>
        //             <TableHead>Address</TableHead>
        //             <TableHead>ZIP Code</TableHead>
        //             <TableHead>State</TableHead>
        //             <TableHead>District</TableHead>
        //             <TableHead className="text-right">Total Amount</TableHead>
        //             <TableHead className="text-right">Paid</TableHead>
        //         </TableRow>
        //     </TableHeader>
        //     <TableBody>
        //         {Orders?.map((orderdata, index) => (
        //             <Fragment key={index}>
        //                 <TableRow>
        //                     <TableCell>{orderdata.orderId}</TableCell>
        //                     <TableCell>{orderdata.name}</TableCell>
        //                     <TableCell>{orderdata.email}</TableCell>
        //                     <TableCell>{orderdata.phone}</TableCell>
        //                     <TableCell>{orderdata.address}</TableCell>
        //                     <TableCell>{orderdata.zipCode}</TableCell>
        //                     <TableCell>{orderdata.state}</TableCell>
        //                     <TableCell>{orderdata.district}</TableCell>
        //                     <TableCell className="text-right">{orderdata.totalAmount}</TableCell>
        //                     <TableCell className="text-right">{orderdata.paymentStatus ? "Yes" : "No"}</TableCell>
        //                 </TableRow>
        //                 {orderdata.products.length > 1 && orderdata.products.map((product, idx) => (
        //                     <TableRow key={`${index}-${idx}`}>
        //                         <TableCell colSpan="10">
        //                             <p>Product Name: {product.Product_name}</p>
        //                             <p>Quantity: {product.quantity}</p>
        //                             <p>Price: {product.price}</p>
        //                         </TableCell>
        //                     </TableRow>
        //                 ))}
        //             </Fragment>
        //         ))}
        //     </TableBody>
        // </Table>
    )
}
export default OrdersClient
