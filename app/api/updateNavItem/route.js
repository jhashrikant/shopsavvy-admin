import connectToMongoDB from "@/Database/MongoDB"
import NavItem from "@/Models/NavItemsSchema"
import { NextResponse } from "next/server"

export async function PATCH(request) {

    try {
        await connectToMongoDB()
        const body = await request.json();
        const { id, labelname } = body
        if (!id || !labelname) {
            return NextResponse.json({ message: "Id is needed to delete NavItem Pls Provide iD", response: false })
        }
        const updateNavItem = await NavItem.findByIdAndUpdate(id, { labelname }, { new: true })
        if (!updateNavItem) {
            return NextResponse.json({ message: 'Navitem could not be found', response: false })
        }
        return NextResponse.json({ updatedNavItem: labelname, message: 'NavItem updated successfully', response: true })

    } catch (error) {
        console.log("some error occured")
        return NextResponse.json({ message: "Some error occured", error, response: false })
    }
}