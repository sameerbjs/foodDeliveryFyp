import React from 'react'
import pizza from '../../assets/images/product_04.jpg'

const UserOrders = () => {
    return (
        <>
            <div class="relative overflow-x-auto intro-x shadow-xl">
                <table class="w-full text-left">
                    <thead class="text-base text-[#212245] uppercase border-2">
                        <tr className='whitespace-nowrap'>
                            <th class="py-3 px-3">
                                Sr #
                            </th>
                            <th colSpan={2} class="py-3 px-3">
                                Product Name
                            </th>
                            <th class="py-3 px-3">
                                Payment
                            </th>
                            <th class="py-3 px-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b bg-gray-200">
                            <td class="py-4 px-3">
                                1
                            </td>
                            <td colSpan={2} class="py-4 px-3">
                                <div className='flex gap-2 items-center whitespace-nowrap'>
                                    <img class="w-10 h-10 lg:block md:block hidden rounded-full" src={pizza} alt="Jese" />
                                    <div>
                                        <div class="text-base font-semibold">Chezious Pizza</div>
                                        <div class="font-normal text-sm">Jalal and sons</div>
                                    </div>
                                </div>
                            </td>
                            <td class="py-4 px-3">
                                Cash
                            </td>
                            <td class="py-4 px-3">
                                <div class="flex items-center">
                                    <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Delivered
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default UserOrders