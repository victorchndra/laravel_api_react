import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Show = () => {
    const {id} = useParams()

    const [post, setPost] = useState(null)

    async function getPosts() {
        const res = await fetch(`/api/posts/${id}`)
        const data = await res.json()

        if(res.ok) {
          setPost(data.post)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <>
            {post ?
                <div key={post.id} className="mt-4 p-4 border rounded-md border-dashed border-slate-400">
                    <div className="mb-2 flex items-start justify-between">
                    <div>
                        <h2 className="font-bold text-2xl">{post.title}</h2>
                        <small className="text-xs text-slate-600">
                        Created by {post.user.name} on {" "}
                        {new Date(post.created_at).toLocaleTimeString()}
                        </small>
                    </div>
                    </div>
                    <p>{post.body}</p>
                </div>
            : <p className="title">There are no posts</p> }
        </>
    )
}

export default Show