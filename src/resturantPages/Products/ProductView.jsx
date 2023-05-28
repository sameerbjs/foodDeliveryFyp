import React, { useEffect } from 'react'
import products from '../../assets/data/Products'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet';

const ProductView = () => {
    const [productDetail, setProductDetail] = React.useState();

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        const getProduct = products.find(el => el.id === id);
        setProductDetail(getProduct);
    }, [id])

    return (
        <>
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
                        <img alt={productDetail?.image01} className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={productDetail?.image01} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <span className="text-sm text-gray-500 tracking-widest">PRODUCT NAME</span>
                            <h1 className="text-[#212245] text-3xl  font-medium mb-1">{productDetail?.title}</h1>
                            <p className="leading-relaxed items-center pb-5 border-b-2 border-gray-100 mb-5">Price : {productDetail?.price} PKR</p>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                            </div>
                            <p className="leading-relaxed items-center pb-5 border-b-2 border-gray-100 mb-5">{productDetail?.desc}.</p>
                            <div>
                                <h2>Total orders : 20</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductView