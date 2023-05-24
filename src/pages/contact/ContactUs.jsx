import React from 'react'

const ContactUs = () => {
    return (
        <>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-7 mx-auto flex sm:flex-nowrap flex-wrap">
                    <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                        <iframe width="100%" height="100%" className="absolute inset-0" title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36855.183698653615!2d74.37807717702766!3d31.54732068852898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1682788578346!5m2!1sen!2s"  ></iframe>
                        <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                            <div className="lg:w-1/2 px-6">
                                <h2 className=" font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                                <p className="mt-1">Pakistan, Lahore Harbanspura Near Amir town canal road</p>
                            </div>
                            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                <h2 className=" font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                                <a href='mailto:example@email.com' className="text-red-500 leading-relaxed">example@email.com</a>
                                <h2 className=" font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                                <p className="leading-relaxed">123-456-7890</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 px-5">
                        <p className="text-gray-900 text-lg mb-1 font-semibold">Contact us</p>
                        <p className="leading-relaxed mb-5 text-gray-600">Don't hesitate to contact us. We are 24/7 avaiable to help you.</p>
                        <div className="relative mb-4">
                            <label htmlFor="name" className="leading-7 text-[15px] font-semibold text-[#212245]">Name</label>
                            <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-[15px] font-semibold text-[#212245]">Email</label>
                            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="message" className="leading-7 text-[15px] font-semibold text-[#212245]">Message</label>
                            <textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
                        <button className="text-white bg-[#df2020] border-0 py-2 px-6 focus:outline-none hover:bg-[#212245] rounded-lg text-lg">Send</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactUs