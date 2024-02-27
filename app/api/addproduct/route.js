import { NextResponse } from "next/server";
import connectToMongoDB from "@/Database/MongoDB";
import Product from '@/Models/Product'

export async function POST(request) {

    const body = await request.json();
    console.log(body);
    try {
        await connectToMongoDB()
        const productadded = new Product(body);
        await productadded.save();
        return NextResponse.json({ message: "product added successfully", response: true })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'cannot add product', error, response: false })
    }
}
