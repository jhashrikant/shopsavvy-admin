'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import ImageUpload from '@/components/ui/Imageupload';
import toast, { Toaster } from 'react-hot-toast';
import { Textarea } from "@/components/ui/textarea"
import { useContext } from 'react';
import { ProductContext } from '@/app/context/ProductContext';
import { useRouter } from 'next/navigation';
import { sizes } from '@/utils';



const Addproductclient = ({ Categories }) => {

    const router = useRouter()

    const context = useContext(ProductContext)
    console.log(context)
    const { formdata, setformdata, Isediting, setIsediting, productid, setProducts } = context
    console.log(Isediting)
    console.log(formdata)
    //update the setproducts when updated and use this products in our productclient also

    console.log('ppppp',formdata)

    const [loading, setLoading] = useState(false);

    console.log('line 20', formdata)
    console.log(formdata.images);


    const handleImageChange = (url) => {
        setformdata((prevformdata) => {
            return {
                ...prevformdata,
                images: [...prevformdata?.images, url],
            };
        });
    };


    function handleImageRemove(urlToRemove) {
        setformdata((prevformdata) => {
            return {
                ...prevformdata,
                images: prevformdata?.images?.filter(url => url !== urlToRemove)
            };
        });
    }

    console.log(formdata.size)

    console.log(formdata)


    function handleformchange(event) {
        setformdata((prevformdata) => {
            return {
                ...prevformdata,
                [event.target.name]: event.target.value
            }
        })
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!Isediting) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/addproduct`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formdata),
                    cache: 'no-store'
                });
                console.log(res);
                if (!res.ok) {
                    toast.error("some issue occurred we didn't get response from server")
                    return;
                }
                const data = await res.json();
                console.log(data);
                if (data.response) {
                    toast.success(data.message)
                    const updateddata = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/getalloriginalProducts`,{
                        cache: 'no-store'
                    })
                    const JSondata = await updateddata.json();
                    if (JSondata.response) setProducts(JSondata?.products);
                    router.push('/Products')
                    setformdata({
                        Product_name: '',
                        slug: '',
                        images: [],
                        price: '',
                        category: '',
                        size: '',
                        qty: '',
                        description: ''
                    })
                } else {
                    toast.error(data.error)
                }
            } catch (error) {
                console.error('Error adding product', error);
                toast.error("Error adding product", error)
            }
        }
        else {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/updateProduct`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: productid, formdata: formdata }),
                    cache: 'no-store'
                });
                console.log(res);
                if (!res.ok) {
                    toast.error("some issue occurred we didn't get response from server")
                    return;
                }
                const data = await res.json();
                console.log(data);
                if (data.response) {
                    toast.success(data.message)
                    const updateddata = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/getalloriginalProducts`,{
                        cache: 'no-store'
                    })
                    const JSondata = await updateddata.json();
                    if (JSondata.response) setProducts(JSondata?.products);
                    router.push('/Products')
                    setformdata({
                        Product_name: '',
                        slug: '',
                        images: [],
                        price: '',
                        category: '',
                        size: '',
                        qty: '',
                        description: ''
                    })
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                console.error("Error updating product:", error);
                toast.error("error updating product", error)
            }
            setIsediting(false)
        }
    }


    return (

        <form onSubmit={handleSubmit} className='pl-20 pr-20 pt-10 flex items-center justify-center'>
            <div className="space-y-12">

                <div className="border-b border-gray-900/10 pb-12">
                    <h1 className="text-lg font-semibold leading-7 text-gray-900">Add a Product</h1>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="Product_name" className="block text-sm font-medium leading-6 text-gray-900">Product name</label>
                            <div className="mt-2">
                                <input value={formdata.Product_name} onChange={handleformchange} type="text" name="Product_name" id="Product_name" className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900">Product slug</label>
                            <div className="mt-2">
                                <input value={formdata.slug} onChange={handleformchange} type="text" name="slug" id="slug" className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>


                        <ImageUpload value={formdata?.images || []}
                            disabled={loading}
                            onChange={handleImageChange}
                            onRemove={handleImageRemove}
                        />

                        <div className="sm:col-span-3">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                            <div className="mt-2">
                                <input value={formdata.price} onChange={handleformchange} type="number" name="price" id="price" className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className='sm:col-span-4'>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium leading-6 text-gray-900">Category</label>
                            <select value={formdata.category} onChange={handleformchange} name='category' className="select w-full max-w-xs bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                <option disabled value=''>Select a Category</option>
                                {Categories?.map((category) => (
                                    <option key={category._id} value={category.labelname}>{category.labelname}</option>
                                ))}
                            </select>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="size" className="block mb-2 text-sm font-medium leading-6 text-gray-900">Size</label>
                            <select value={formdata.size} onChange={handleformchange} name="size" className='select w-full max-w-xs bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' >
                                <option disabled value=''>Select a Size</option>
                                {sizes?.map((size) => (
                                    <option name="size" key={size.id} value={size.size}>{size.size}</option>
                                ))}
                            </select>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="qty" className="block text-sm font-medium leading-6 text-gray-900">Quantity</label>
                            <div className="mt-2">
                                <input value={formdata.qty} onChange={handleformchange} id="qty" name="qty" type="number" className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                            <div className="mt-2">
                                <Textarea
                                    value={formdata.description} onChange={handleformchange} type="text" name="description" id="description" className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                    </div>
                </div>

                <div className="!mb-6 flex items-center justify-end gap-x-6">
                    <button type="submit" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                    {/* <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button> */}
                    <Button type="submit">Save</Button>
                </div>
            </div>
            <Toaster />
        </form>
    )
}

export default Addproductclient
