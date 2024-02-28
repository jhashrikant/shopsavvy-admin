import connectToMongoDB from "@/Database/MongoDB";
import { NextResponse } from "next/server";
import NavItem from "@/Models/NavItemsSchema";
export const dynamic = 'force-dynamic';

export async function POST(request) {
    const body = await request.json();

    console.log(body)

    try {
        const { labelname } = body
        await connectToMongoDB();
        if (!labelname) {
            return NextResponse.json({ message: "Labelname is required", response: false })

        }
        const navitems = new NavItem({ labelname })
        await navitems.save()
        return NextResponse.json({ message: "NavItem added successfully", response: true })

    } catch (error) {
        console.log("some error occured", error)
        return NextResponse.json({ message: "some error occured", response: false })
    }
}

