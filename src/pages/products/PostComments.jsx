import React, {useCallback, useEffect, useState} from "react";
import Comments from "./Comments";
import ReactStars from "react-stars";
import {notify} from "../../helper";
import Api from "../../services/api";
import {useSelector} from "react-redux";
import Loader from "../../components/loader/Loader";

const PostComments = ({id}) => {
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [newRating, setNewRating] = useState(0);
    const [allComments, setAllComments] = useState([]);
    const user_id = useSelector((store) => store.authUser?.userAuth?._id);
    const ratingChanged = (newRating) => {
        setNewRating(newRating);
    };

    useEffect(() => {
        const fetchAllComments = async () => {
            const response = await Api.getRestUserFeedback(id);
            if (response?.data?.ratings) {
                setAllComments(response?.data?.ratings);
            }
        };
        fetchAllComments();
    }, [id]);

    const addComment = useCallback(async () => {
        if (!comment) {
            notify("error", "Comment field cannot be empty");
            return;
        }

        setIsLoading(true);
        const dataComment = {
            comment: comment,
            rating: newRating,
            resturant: id,
            user: user_id,
        };

        const response = await Api.postRestUserFeedback(dataComment);
        if (response.status === 200) {
            setAllComments((prevComments) => [
                ...prevComments,
                response.data?.data,
            ]);
            setComment("");
            setNewRating(0);
            setIsLoading(false);
        } else {
            setIsLoading(false);
            notify("error", response.data?.error);
        }
    }, [comment, newRating, id, user_id]);

    const deleteComment = async (commentId) => {
        const response = await Api.deleteRestUserFeedback(commentId);
        if (response.status === 200) {
            setAllComments((prevComments) =>
                prevComments.filter((comment) => comment._id !== commentId)
            );
        } else {
            notify("error", response.data?.error);
        }
    };
    return (
        <>
            <div>
                <span className="text-lg">Rate our resturant</span>
                <div className="flex gap-2 items-center">
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        value={newRating}
                        color2={"#ffd700"}
                    />
                    <span className="text-base">{newRating}</span>
                </div>
                <textarea
                    name="comment"
                    className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    rows="5"
                ></textarea>
                <div className="flex justify-end">
                    <button
                        onClick={addComment}
                        className="flex items-center bg-red-500 hover:bg-[#212245] text-white fs-14 px-3 py-2 rounded-lg shadow-md"
                    >
                        {isLoading ? (
                            <Loader width="w-8" height="h-8" />
                        ) : (
                            "Send"
                        )}
                    </button>
                </div>
            </div>
            <div className="my-5">
                <p className="text-[#212245] text-xl">User Feedback</p>
            </div>
            {allComments &&
                allComments.map((data) => {
                    return (
                        <>
                            <Comments
                                data={data}
                                onDelete={() => deleteComment(data._id)}
                                user_id={user_id}
                            />
                        </>
                    );
                })}
        </>
    );
};

export default PostComments;
