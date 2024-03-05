import { NextResponse } from "next/server";
import connectToMongoDB from "@/Database/MongoDB";
import Product from '@/Models/Product'
// export const dynamic = 'force-dynamic';
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
        return NextResponse.json({ message: 'cannot add product ,some error occured', error, response: false })
    }
}
