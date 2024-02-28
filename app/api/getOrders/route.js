import connectToMongoDB from "@/Database/MongoDB"
import { NextResponse } from "next/server"
import Order from '@/Models/Order'
export const dynamic = 'force-dynamic';

export async function GET() {
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