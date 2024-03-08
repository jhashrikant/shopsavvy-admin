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
import { useEffect, useState ,useCallback} from "react";
import { useProductContext } from "@/app/context/ProductContext";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input"
import { debounce } from "@/utils";


const ProductClient = ({ products }) => {

	const apiUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_APP_BASE_URL : 'http://localhost:3001';

	const router = useRouter()

	const [filteredProducts, setfilteredProducts] = useState([])

	const { setformdata, setIsediting, setproductId } = useProductContext()

	const [query, setquery] = useState('')

	const fetchproductsByname = async (querysearched) => {
		console.log('hello')
		if (querysearched.toLowerCase() === '') {
			setfilteredProducts([])
			return;
		}
		const filteredProducts = products.filter((product) => {
			return (
				product.Product_name.toLowerCase().includes(querysearched.toLowerCase())
			);
		});
		setfilteredProducts(filteredProducts);
	}

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
		try {
			const response = await fetch(`${apiUrl}/api/deleteProduct`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: id }),
			});
			if (!response.ok) {
				toast.error("some issue occurred we didn't get response from server")
				return;
			}
			const data = await response.json();
			console.log(data);
			if (data.response) {
				router.refresh()
				toast.success(data.message)
			}
			else {
				toast.error(data.message)
			}
		} catch (error) {
			console.error("Some Error occured:", error);
			toast.error(error.message || "An unexpected error occurred. Please try again")
		}
	}


	const debouncedfn = useCallback(debounce(fetchproductsByname, 300),[])

	useEffect(() => {
		debouncedfn(query)
	}, [query])

	return (
		<>
			<div className="flex justify-between items-center">
				<h2 className="mt-5 ml-5 mb-5 font-bold text-2xl">Products({filteredProducts.length === 0 && query !== '' ? 0 : filteredProducts.length !== 0 ? filteredProducts.length : products.length})</h2>
				<Input value={query} onChange={(event) => setquery(event.target.value)} type="text" placeholder="Search by Product name" />
			</div>
			{products.length === 0 && <div>No products found</div>}
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
					{filteredProducts.length === 0 && query !== '' ?
						<TableRow>
							<TableCell colSpan={8} className="text-center">No results found</TableCell>
						</TableRow>
						: filteredProducts.length === 0 ?
							products && products?.map((product, index) => (
								<TableRow key={index}>
									<TableCell className="font-medium">{product.Product_name}</TableCell>
									<TableCell>{product.description}</TableCell>
									<TableCell>{product.category}</TableCell>
									<TableCell className="text-right font-semibold">{product.size}</TableCell>
									<TableCell className="text-right font-semibold">{product.qty}</TableCell>
									<TableCell className="text-right">&#8377;{product.price}</TableCell>
									<TableCell className="text-right flex items-center justify-end"><Image className="" width={50} height={50} src={product.images?.[0]} alt={product.Product_name} /></TableCell>
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
							)) : filteredProducts.map((product, index) => (
								<TableRow key={index}>
									<TableCell className="font-medium">{product.Product_name}</TableCell>
									<TableCell>{product.description}</TableCell>
									<TableCell>{product.category}</TableCell>
									<TableCell className="text-right font-semibold">{product.size}</TableCell>
									<TableCell className="text-right font-semibold">{product.qty}</TableCell>
									<TableCell className="text-right">&#8377;{product.price}</TableCell>
									<TableCell className="text-right flex items-center justify-end"><Image className="" width={50} height={50} src={product.images?.[0]} alt={product.Product_name} /></TableCell>
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
