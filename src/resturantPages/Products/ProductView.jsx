import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import Api from '../../services/api';
import Loader from '../../components/loader/Loader';
import DeleteProductModel from './DeleteModel';
import { notify } from '../../helper';
import { ToastContainer } from 'react-toastify';

const ProductView = () => {
    const [productDetail, setProductDetail] = useState();
    const [productId, setProductId] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsloading(true);
        const getProduct = async () => {
            const response = await Api.getSpecificProduct(id);
            setProductDetail(response?.data);
            setIsloading(false);
        }
        getProduct();
    }, [id])

    const handleDeleteModel = (id) => {
        setProductId(id);
        setIsOpen(true);
    }

    const handleDeleteProduct = async () => {
        setIsloading(true);
        const response = await Api.deleteProduct(productId);
        if (response?.data?.message) {
            setIsloading(false);
            navigate('/products')
        } else {
            setIsloading(false);
            notify('success', response?.data?.error);
        }
    }

    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-100px)] overflow-hidden">
                <Loader width="w-16" height="h-16" />
            </div>
        );
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={1500}
            />
            <Helmet>
                <title>Rapid Cravings - Detail</title>
            </Helmet>
            <section className="text-gray-600 overflow-hidden">
                <div className="container px-5 py-7 mx-auto">
                    <div className='mb-5'>
                        <button onClick={() => navigate(-1)} className="rounded-xl bg-gray-200 hover:bg-gray-300 px-4 py-1 inline-flex gap-1 items-center justify-center text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Back
                        </button>
                    </div>
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        {
                            productDetail ?
                                <>
                                    <img alt={productDetail} className="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded" src={`${productDetail?.productPic}`} />
                                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                        <span className="text-sm text-gray-500 tracking-widest">PRODUCT NAME</span>
                                        <h1 className="text-[#212245] text-3xl  font-medium mb-1">{productDetail?.title}</h1>
                                        <p className="leading-relaxed items-center pb-5 border-b-2 border-gray-100 mb-5">Price : {productDetail?.price} PKR</p>
                                        <p className="leading-relaxed items-center pb-5 mb-5">Size : {productDetail?.size}</p>
                                        <pre className="leading-relaxed whitespace-pre-line items-center pb-5 border-b-2 border-gray-100 mb-5">{productDetail?.description}.</pre>
                                        <div className='flex items-center justify-between flex-wrap gap-3'>
                                            <div>
                                                <h2>Total orders : 20</h2>
                                            </div>
                                            <div className='flex gap-2 items-center mt-3'>
                                                <Link to={`/edit-pro/${productDetail?._id}`} className='relative bg-red-500 hover:bg-[#212245] text-white font-medium flex justify-center py-2 px-4 border border-transparent rounded-lg focus:outline-none'>Edit</Link>
                                                <button onClick={() => handleDeleteModel(productDetail?._id)} className='relative bg-red-500 hover:bg-[#212245] text-white font-medium flex justify-center py-2 px-4 border border-transparent rounded-lg focus:outline-none'>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : <div className='flex justify-center items-center w-full h-[calc(100vh-290px)]'><Loader width={'w-16'} height={'h-16'} /></div>
                        }
                    </div>
                </div>
            </section>
            <DeleteProductModel isOpen={isOpen} setIsOpen={setIsOpen} navigate={navigate} handleDeleteProduct={handleDeleteProduct} />

        </>
    )
}

export default ProductView