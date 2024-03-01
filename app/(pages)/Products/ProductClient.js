"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ProductContext } from "@/app/context/ProductContext";
import toast, { Toaster } from "react-hot-toast";


const ProductClient = ({ products }) => {

    const apiUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_APP_BASE_URL : 'http://localhost:3001';

    const router = useRouter()

    const context = useContext(ProductContext)
    const { formdata, setformdata, setIsediting, setproductId, Products, setProducts } = context
    console.log(Products)
    console.log(formdata);


    const handleUpdate = async (product) => {
        console.log(product)
        setIsediting(true)
        const { _id, Product_name, slug, images, price, category, size, qty, description } = product
        setproductId(_id)
        setformdata({
            Product_name: Product_name,
            slug: slug,
            images: images,
            price: price,
            category: category,
            size: size,
            qty: qty,
            description: description,
        })
        router.push('/Addproducts');
    }

    const handleDelete = async (id) => {
        console.log(id)
        try {
            const response = await fetch(`${apiUrl}/api/deleteProduct`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: id }),
                cache: 'no-store'
            });
            if (!response.ok) {
                toast.error("some issue occurred we didn't get response from server")
                return;
            }
            const data = await response.json();
            console.log(data);
            if (data.response) {
                toast.success(data.message)
                const updateddata = await fetch(`${apiUrl}/api/getalloriginalProducts`, { next: { revalidate: 0 } })
                const JSondata = await updateddata.json();
                if (JSondata?.response) setProducts(JSondata?.products);
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Some Error occured:", error);
            toast.error(error.message || "An unexpected error occurred. Please try again")
        }
    }

    return (
        <>
            <h2 className="mt-5 ml-5 mb-5 font-bold text-2xl">Products({Products.length})</h2>
            <Table>
                <TableCaption>A list of your recent Products.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ProductName</TableHead>
                        <TableHead className="">Description</TableHead>
                        <TableHead className="">Category</TableHead>
                        <TableHead className="text-right">Size</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Image</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {Products && Products?.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{product.Product_name}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell className="text-right font-semibold">{product.size}</TableCell>
                            <TableCell className="text-right font-semibold">{product.qty}</TableCell>
                            <TableCell className="text-right">&#8377;{product.price}</TableCell>
                            <TableCell className="text-right flex items-center justify-end"><Image className="" width={50} height={50} src={product.images?.[0]} alt="productImage" /></TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger><MoreHorizontal /></DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => handleUpdate(product)} className="cursor-pointer">Update</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDelete(product._id)} className="cursor-pointer">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody >

            </Table >
            <Toaster />
        </>
    )
}

export default ProductClient
