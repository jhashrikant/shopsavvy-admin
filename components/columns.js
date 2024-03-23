"use client"

import { ColumnDef } from "@tanstack/react-table"

export const columns = [
	{
		accessorKey: "productName",
		header: "ProductName",
	},
	{
		accessorKey: "description",
		header: "Description",
	},
	{
		accessorKey: "category",
		header: "Category",
	},
	{
		accessorKey: "quantity",
		header: "Quantity",
	},
	{
		accessorKey: "sizes",
		header: "Sizes",
	},
	{
		accessorKey: "price",
		header: "Price",
	},
	{
		accessorKey: "image",
		header: "Image",
	}
];


