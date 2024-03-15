import connectToMongoDB from "@/Database/MongoDB";
import { NextResponse } from "next/server";
import Product from '@/Models/Product'
export const dynamic = 'force-dynamic';
export async function GET(request) {
  try {
    await connectToMongoDB()
    const category = request.nextUrl.searchParams.get("category")
    const products = await Product.find({ category: category })

    let tshirts = {};
    for (let item of products) {
      if (item.qty > 0) {
        if (item.Product_name in tshirts) {
          // Product already exists in tshirts, check if the size exists
          const existingSize = tshirts[item.Product_name].size.find(s => s.size === item.size);
          //if same product exists and also we tryna add same size but different qty the just increase the qty
          //else add a new [] array of objects with the new size and qty
          //there is no need to check for existing size as we will not be pushing or adding a product with the same size 
          //cuz we can update its qty from admin frontend already 
          //we will just add if we have a new size with us else suppose we have L size we wont be adding L again we just increase it qty if we have in stock

          if (existingSize) {
            // Size already exists, increase the quantity
            existingSize.qty += item.qty;
          } else {
            // Size doesn't exist, add a new size
            tshirts[item.Product_name].size.push({ productId: item._id, size: item.size, qty: item.qty });
          }
        } else {
          // Product doesn't exist in tshirts, add it with the first size
          tshirts[item.Product_name] = JSON.parse(JSON.stringify(item))
          delete tshirts[item.Product_name].qty
          if (item.qty > 0) {
            tshirts[item.Product_name].size = [{ productId: item._id, size: item.size, qty: item.qty }]
          }
        }
      }
    }
    return NextResponse.json({ message: 'Products fetched Successfully', products: tshirts, response: true })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "some error occured", error, response: false })
  }
}