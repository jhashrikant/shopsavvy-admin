import connectToMongoDB from "@/Database/MongoDB"
import { NextResponse } from "next/server"
import Order from '@/Models/Order'

export async function GET(request) {
    try {
        await connectToMongoDB();
        const Orders = await Order.find()
        console.log(Orders)
        return NextResponse.json({ message: "Orders fetched successfully", response: true, Orders })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Some error occured", error, response: false })
    }
}