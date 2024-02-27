import connectToMongoDB from "@/Database/MongoDB"
import Product from "@/Models/Product"
import { NextResponse } from "next/server"

export async function DELETE(request) {
    try {
        await connectToMongoDB()
        const body = await request.json()
        const { id } = body

        if (!id) {
            return NextResponse.json({ message: "Please provide the id to delete the product", response: false })
        }
        const deleteProduct = await Product.findByIdAndDelete(id)
        if (!deleteProduct) {
            return NextResponse.json({ message: 'Product could not be found for deleting', response: false })
        }
        return NextResponse.json({ message: "Product has been deleted successfully", response: true })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Some error occured" ,error, response: false })
    }
}