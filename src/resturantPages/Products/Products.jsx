import React from 'react'
import products from '../../assets/data/Products'
import { Link } from 'react-router-dom'

const AllProducts = () => {
    return (
        <>
            <div className="container px-5 py-7 mx-auto overflow-hidden">
                <div className='flex justify-between items-center flex-wrap gap-3'>
                    <h1 className='lg:text-2xl md:text-xl text-lg font-semibold'>Here is your all products</h1>
                    <Link to={'/add-pro'} className="flex items-center bg-red-500 hover:bg-[#212245] text-white fs-14 px-3 py-2 rounded-lg shadow-md">Add New Product</Link>
                </div>
                <div class="relative overflow-x-auto mt-5">
                    <table class="w-full text-sm text-left">
                        <thead class="border text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Total sale
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {
                                products.map((item) => {
                                    return (
                                        <tr class="border" key={item.id}>
                                            <th scope="row" class="px-6 py-4 font-normal whitespace-nowrap">
                                                {item.title}
                                            </th>
                                            <td class="px-6 py-4">
                                                {item.category}
                                            </td>
                                            <td class="px-6 py-4">
                                                20
                                            </td>
                                            <td class="px-6 py-4">
                                                {item.price} pkr
                                            </td>
                                            <td class="px-6 py-4">
                                                <div className='flex gap-2 items-center'>
                                                    <Link to={`/edit-pro/${item.id}`} className='border px-2 py-1 hover:bg-slate-200/60'>Edit</Link>
                                                    <Link to={`/pro-view/${item.id}`} className='border px-2 py-1 hover:bg-slate-200/60'>View</Link>
                                                    <button className='border px-2 py-1 hover:bg-slate-200/60'>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AllProducts