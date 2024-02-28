import Product from "@/Models/Product";
import connectToMongoDB from "@/Database/MongoDB";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export async function PATCH(request) {
    try {
        await connectToMongoDB()

        const body = await request.json();
        const { id, formdata } = body

        if (!id || !formdata) {
            return NextResponse.json({ message: "Please provide the id to update and the data", response: false })
        }
        const updateProduct = await Product.findByIdAndUpdate(id, formdata, { new: true })

        if (!updateProduct) {
            return NextResponse.json({ message: "Product not found", response: false })
        }
        return NextResponse.json({ Updatedproduct: formdata, message: "Product Updated successfully", response: true })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "some error occured", response: false })
    }
}