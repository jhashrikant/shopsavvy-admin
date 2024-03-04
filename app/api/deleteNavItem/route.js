import connectToMongoDB from "@/Database/MongoDB";
import NavItem from "@/Models/NavItemsSchema";
import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic';
export async function DELETE(request) {
    try {
        await connectToMongoDB()
        const body = await request.json();
        const { id } = body
        if (!id) {
            return NextResponse.json({ message: "id is required to delete the Category", response: false })
        }
        const deleteNavItem = await NavItem.findByIdAndDelete(id)
        if (!deleteNavItem) {
            return NextResponse.json({ message: "Category could not be found for deleting", response: false })
        }
        return NextResponse.json({ message: "Category has been deleted successfully", response: true })

    } catch (error) {
        console.log("some error occured", error)
        return NextResponse.json({ message: "some error occured", error, response: false })
    }
}