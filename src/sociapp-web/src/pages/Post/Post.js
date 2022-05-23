import React, { useEffect } from "react";
import { useState } from "react";
import "./Post.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import CommentCard from "../../components/CommentCard/CommentCard";

function Post() {
    let { id } = useParams();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [imageURI, setImageURI] = useState("");
    const [reaction, setReaction] = useState("");
    const [text, setText] = useState("");

    const [commentText, setCommentText] = useState("");

    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios
            .get(
                `http://127.0.0.1:8080/api/post/single?postId=${id}&email=${localStorage.getItem("email")}`
            )
            .then((res) => {
                setEmail(res.data.Email);
                setImageURI(res.data.ImageURI);
                setReaction(res.data.Reaction);
                setText(res.data.Text);
            })
            .then(() =>
                axios
                    .get(`http://127.0.0.1:8080/api/comment?postId=${id}&email=${localStorage.getItem('email')}`)
                    .then((res) => {
                        setComments(res.data);
                    })
            );
    }, []);

    const addComment = () => {
        axios
            .post(`http://127.0.0.1:8080/api/comment`, {
                postId: id,
                email: localStorage.getItem("email"),
                text: commentText,
            })
            .then((res) => {
                setCommentText("");
                return axios.get(
                    `http://127.0.0.1:8080/api/comment?postId=${id}`
                );
            })
            .then((res) => {
                setComments(res.data);
            });
    };

    return (
        <div className="text-black flex flex-row flex-wrap">
            <div className="w-full flex flex-col sm:w-12/12 md:w-12/12 mt-4">
                <div className="flex justify-center mt-4">
                    <PostCard
                        postId={id}
                        imageURI={imageURI}
                        text={text}
                        react={reaction}
                    />
                </div>
                <br />
                {localStorage.getItem("email") !== null && (
                    <div className="flex justify-center">
                        <div className="mb-3 sm:w-12/12 md:w-4/12">
                            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                                <input
                                    type="search"
                                    className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Comment"
                                    aria-label="Comment"
                                    aria-describedby="button-addon2"
                                    value={commentText}
                                    onChange={(e) =>
                                        setCommentText(e.target.value)
                                    }
                                />
                                <button
                                    className="btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                                    type="button"
                                    id="button-addon2"
                                    onClick={addComment}
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {comments.map((c, idx) => (
                    <CommentCard
                        key={`comm-${idx}`}
                        name={
                            (c.FirstName + " " + c.LastName).length > 3
                                ? c.FirstName + " " + c.LastName
                                : c.Email
                        }
                        commentId={c.Id}
                        email={c.Email}
                        text={c.Text}
                        react={c.Reaction}
                    />
                ))}
            </div>
        </div>
    );
}

export default Post;
