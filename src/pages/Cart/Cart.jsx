import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import products from '../../assets/data/Products';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { removeToCartProduct } from '../../redux/CartHandle';
import { ToastContainer } from 'react-toastify';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
    }, []);

    const handleRemoveCart = (proId) => {
        dispatch(removeToCartProduct({ id: proId }))
    }


    const cartProducts = useSelector(store => store.cart.cartProducts);
    const showProducts = cartProducts.map(obj => products.find(item => parseInt(item.id) === obj.id));
    return (
        <>
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={1000}
            />
            <React.Fragment>
                <div className="container px-5 py-7 mx-auto">
                    <div className='mb-5'>
                        <button onClick={() => navigate(-1)} className="rounded-xl bg-gray-200 hover:bg-gray-300 px-4 py-1 inline-flex gap-1 items-center justify-center text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Back
                        </button>
                    </div>

                    <div className='mt-7'>
                        <div className={`grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 ${showProducts?.length > 4 ? '' : 'h-[calc(100vh-250px)]'}`}>
                            {
                                showProducts?.length ? showProducts.map((cart, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="p-4 w-full relative border">
                                                <Link className="block h-48 rounded overflow-hidden">
                                                    <img alt="ecommerce" className="object-contain h-full w-full" src={cart.image03} />
                                                </Link>
                                                <div className="mt-4">
                                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Name</h3>
                                                    <h2 className="text-gray-900 title-font text-lg font-medium">{cart.title}</h2>
                                                    <p className="mt-1">{cart.price} PKR</p>
                                                </div>
                                                <button onClick={() => handleRemoveCart(parseInt(cart?.id))} className='absolute -right-[10px] -top-[11px] bg-[#df2020] rounded-2xl'>
                                                    <XMarkIcon className='w-5 h-5 text-white' />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }) : <>
                                    <div className='col-span-4 h-full flex justify-center items-center'>
                                        <h1 className='lg:text-2xl md:text-xl text-lg'>No products found in the cart 🛒</h1>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </>
    )
}

export default Cart