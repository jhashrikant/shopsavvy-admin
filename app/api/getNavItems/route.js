import connectToMongoDB from "@/Database/MongoDB"
import NavItem from "@/Models/NavItemsSchema";
import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectToMongoDB();
        const navitems = await NavItem.find()
        return NextResponse.json({ navItems: navitems, message: "navitems fetched success", response: true })

    } catch (error) {
        console.log("some error occured", error)
        return NextResponse.json({ message: error, response: false })
    }
}