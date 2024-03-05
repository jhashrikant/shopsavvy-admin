"use client"
import { Button } from "@/components/ui/button"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DialogFooter } from "@/components/ui/dialog"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import MyModal from "@/components/ui/headlessui/Dialog"

const CategoriesClient = ({ Categories }) => {

	const apiUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_APP_BASE_URL : 'http://localhost:3001';
	
	const router = useRouter();

	const [labelname, setlabelname] = useState('')
	const [isUpdating, setisUpdating] = useState(false)
	const [Navitemid, setNavitemid] = useState('')
	const [open, setOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleLabelchange = (event) => {
		const categoryValue = event?.target?.value.trim()
		setlabelname(categoryValue)
	}

	const handleaddNewCategory = async () => {
		if (!labelname) {
			toast.error("please Enter the category Name")
			return;
		}

		const method = isUpdating ? "PATCH" : "POST"
		const endpoint = isUpdating ? "updateNavItem" : "addNavItems"

		try {
			const response = await fetch(`${apiUrl}/api/${endpoint}`, {
				method: method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(isUpdating ? { id: Navitemid, labelname: labelname } : { labelname: labelname }),
			});
			if (!response.ok) {
				toast.error("some issue occurred we didn't get response from server")
				return;
			}
			const data = await response.json();
			if (data.response) {
				router.refresh()
				toast.success(data.message)
			}
			else toast.error(data.message)
			if (isUpdating) {
				setIsModalOpen(false);
				setisUpdating(false)
			}
			setlabelname('')
			setOpen(false)
		} catch (error) {
			console.log(error)
			setisUpdating(false)
			toast.error(error.message || "An unexpected error occurred. Please try again")
		}
	}

	const handleUpdate = async (navitem) => {
		const { _id, labelname } = navitem
		setisUpdating(true)
		setNavitemid(_id)
		setlabelname(labelname)
	}

	const handlekeypress = (event) => {
		if (event.key === 'Enter') {
			handleaddNewCategory();
		}
	}

	const handleDelete = async (id) => {
		console.log(id)
		try {
			const response = await fetch(`${apiUrl}/api/deleteNavItem`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: id }),
			});
			console.log(response)
			if (!response.ok) {
				toast.error("some issue occurred we didn't get response from server")
				return
			}
			const data = await response.json();
			console.log(data);
			if (data.response) {
				router.refresh()
				toast.success(data.message)
			}
			else toast.error(data.message);

		} catch (error) {
			console.error("Some Error occured:", error);
			toast.error(error.message || "An unexpected error occurred. Please try again")
		}
	}


	return (
		<>
			<div className="pl-10 pr-10 pt-5 pb-5 flex justify-between items-center">
				<h2 className="font-bold text-2xl">Categories({Categories.length})</h2>
				<MyModal handlekeypress={handlekeypress} labelname={labelname} handleLabelchange={handleLabelchange} handleaddNewCategory={handleaddNewCategory} />
			</div>

			<Separator />

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">LabelName</TableHead>
						<TableHead>Date</TableHead>
						<TableHead className="">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Categories && Categories?.map((categorydata, index) => (
						<TableRow key={index}>
							<TableCell className="font-medium">{categorydata?.labelname}</TableCell>
							<TableCell>{new Date().toDateString()}</TableCell>
							<TableCell className="">
								<Dialog open={open} onOpenChange={setOpen}>
									<DropdownMenu>
										<DropdownMenuTrigger className="cursor-pointer" ><MoreHorizontal /></DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DialogTrigger asChild >
												<DropdownMenuItem onSelect={(e) => { e.preventDefault(); handleUpdate(categorydata); }} className="cursor-pointer">Update</DropdownMenuItem>
											</DialogTrigger>
											<DialogContent className="sm:max-w-[425px]">
												<DialogHeader>
													<DialogTitle>Update Label</DialogTitle>
													<DialogDescription>

													</DialogDescription>
												</DialogHeader>
												<div className="grid gap-4 py-4">
													<div className="grid grid-cols-4 items-center gap-4">
														<Label htmlFor="name" className="text-right">
															Name
														</Label>
														<Input id="name" onKeyDown={handlekeypress} onChange={handleLabelchange} value={labelname} className="col-span-3" />
													</div>
												</div>
												<DialogFooter>
													<Button onClick={handleaddNewCategory} type="submit">Save changes</Button>
												</DialogFooter>
											</DialogContent>

											<DropdownMenuSeparator />
											<DropdownMenuItem onClick={() => handleDelete(categorydata._id)} className="cursor-pointer">Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</Dialog>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table >
			<Toaster />
		</>
	)
}

export default CategoriesClient
