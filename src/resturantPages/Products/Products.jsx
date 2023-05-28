import React from 'react'
const AllProducts = () => {
    return (
        <>
            <div>
                <div>
                    <h1 className='lg:text-2xl md:text-xl text-lg'>Here is your all products</h1>
                </div>
                <div class="relative overflow-x-auto mt-5">
                    <table class="w-full text-sm text-left">
                        <thead class="text-black uppercase">
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
                        <tbody>
                            <tr class="border-b bg-slate-800">
                                <th scope="row" class="px-6 py-4 font-normal whitespace-nowrap text-white">
                                    Apple MacBook Pro 17"
                                </th>
                                <td class="px-6 py-4 text-white">
                                    Desi
                                </td>
                                <td class="px-6 py-4 text-white">
                                    20
                                </td>
                                <td class="px-6 py-4 text-white">
                                    900 pkr
                                </td>
                                <td class="px-6 py-4 text-white">
                                    <div className='flex gap-2 items-center'>
                                        <button className='border px-2 py-1 hover:bg-slate-200/60'>Edit</button>
                                        <button className='border px-2 py-1 hover:bg-slate-200/60'>View</button>
                                        <button className='border px-2 py-1 hover:bg-slate-200/60'>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AllProducts