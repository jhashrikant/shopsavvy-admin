import connectToMongoDB from "@/Database/MongoDB"
import Product from "@/Models/Product"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await connectToMongoDB()
        const products = await Product.find()
        return NextResponse.json({ products: products, response: true, message: "Products fetched successfully" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "some error occured", response: false })
    }
}

