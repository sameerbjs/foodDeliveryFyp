import React from 'react'
import { Link } from 'react-router-dom'
import OrderFilter from './OrderFilter'

const Orders = () => {
    return (
        <>
            <section className="container px-5 py-7 mx-auto overflow-hidden">
                <div className='text-center'>
                    <h1 className='lg:text-2xl md:text-xl text-lg font-semibold text-[#212245]'>
                        Here you can see your Orders
                    </h1>
                </div>
                <div className='max-w-sm my-3 ml-auto'>
                    <OrderFilter />
                </div>
                <div class="relative overflow-x-auto mt-5">
                    <table className="min-w-full divide-y divide-gray-300 text-left">
                        <thead className="bg-gray-200">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Sr #
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <th scope="row" class="px-6 py-4">
                                    1
                                </th>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    Pizza and hot
                                </td>
                                <td class="px-6 py-4">
                                    Pending
                                </td>
                                <td class="px-6 py-4">
                                    2
                                </td>
                                <td class="px-6 py-4">
                                    <div className='flex gap-2 items-center'>
                                        <Link className='border px-2 py-1 hover:bg-slate-200/60'>View</Link>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="px-6 py-4">
                                    1
                                </th>
                                <td class="px-6 py-4">
                                    Pizza and hot
                                </td>
                                <td class="px-6 py-4">
                                    Pending
                                </td>
                                <td class="px-6 py-4">
                                    2
                                </td>
                                <td class="px-6 py-4">
                                    <div className='flex gap-2 items-center'>
                                        <Link className='border px-2 py-1 hover:bg-slate-200/60'>View</Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default Orders