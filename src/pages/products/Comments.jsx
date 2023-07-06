import React from "react";
import moment from "moment";
import {BsFillStarFill} from "react-icons/bs";

const Comments = ({data, onDelete, user_id}) => {
    return (
        <div className="flex flex-col md:grid grid-cols-12 intro-x">
            <div className="flex md:contents">
                <div className="col-start-1 col-end-2 md:mx-auto relative hidden md:block lg:block">
                    <div className="h-full w-6 flex items-center justify-center">
                        <div className="h-full w-px bg-slate-200 pointer-events-none"></div>
                    </div>
                    <div className="h-px w-40 bg-slate-200 pointer-events-none absolute -left-2 top-1/2 "></div>
                    <div className="w-10 h-10 absolute -left-2 top-1/2 -mt-5 rounded-full shadow text-center zoom-in">
                        <img
                            src={`https://api.dicebear.com/6.x/bottts/svg?seed=${data?.user?.name}`}
                            alt="avatar"
                            className="rounded-full object-cover shadow-lg shrink-0"
                        />
                    </div>
                </div>
                <div className="bg-white relative border col-start-2 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="">Posted By : {data?.user?.name}</h3>
                        <div className="flex items-baseline gap-1">
                            ({data?.rating}
                            <BsFillStarFill color="#ffb413" size={15} />)
                        </div>
                        <p className="text-sm text-black ml-auto">
                            {moment(data?.createdAt).format("D MMMM")}
                        </p>
                    </div>
                    <div>
                        <p className="py-1 mt-3 rounded-full cursor-pointer inline-block">
                            {data?.comment}
                        </p>
                    </div>
                    {data?.user?._id === user_id && (
                        <div className="flex justify-end">
                            <button
                                onClick={() => onDelete()}
                                className="flex items-center bg-red-500 hover:bg-[#212245] text-white fs-14 px-3 py-2 rounded-lg shadow-md ml-3"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comments;
