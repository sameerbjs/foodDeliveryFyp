import React from 'react'

const Comments = () => {
    return (
        <div
            className="flex flex-col md:grid grid-cols-12 intro-x"
        >
            <div className="flex md:contents">
                <div className="col-start-1 col-end-2 md:mx-auto relative hidden md:block lg:block">
                    <div className="h-full w-6 flex items-center justify-center">
                        <div className="h-full w-px bg-slate-200 pointer-events-none"></div>
                    </div>
                    <div className="h-px w-40 bg-slate-200 pointer-events-none absolute -left-2 top-1/2 "></div>
                    <div className="w-10 h-10 absolute -left-2 top-1/2 -mt-5 rounded-full shadow text-center zoom-in">
                        <img
                            src={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=avatar`}
                            alt="avatar"
                            className="rounded-full object-cover shadow-lg shrink-0"
                        />
                    </div>
                </div>
                <div className="bg-white relative border col-start-2 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
                    <div className="flex items-center flex-wrap">
                        <h3 className="">Posted By : Sameer</h3>
                        <p className="text-xs text-black ml-auto">
                            3 June 2023
                        </p>
                    </div>
                    <div>
                        <p className="py-1 mt-3 rounded-full cursor-pointer inline-block">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt atque vitae dolores cupiditate mollitia culpa! Quidem harum quos enim et reiciendis ea recusandae fugiat laudantium! Similique maxime eaque accusantium perspiciatis.
                        </p>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="flex items-center bg-red-500 hover:bg-[#212245] text-white fs-14 px-3 py-2 rounded-lg shadow-md ml-3"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments