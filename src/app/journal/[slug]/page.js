// import { useParams, Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/server";
import Link from 'next/link';
import styles from "@/app/page.module.css";

const DetailPage = async ({ params }) => {
//   const { id } = useParams();
//   const post = data?.find((v) => String(v.id) === String(id));
//   const [newComment, setNewComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [upvoteCount, setUpvotes] = useState(0);

  const { slug } = params;
    const supabase = await createClient();
    const { data: post, error: fetchError } = await supabase
      .from("JournalEntries")
      .select("*")
      .eq("slug", slug)
      .single();
  
    if (fetchError || !post) {
      return <div>Post not found</div>;
    }

//   useEffect(() => {
//     if (post && post.comments) {
//       setComments(post.comments);
//     } else {
//       setComments([]);
//     }
//     if (post && post.upvoteCount) {
//       setUpvotes(post.upvoteCount);
//     }
//   }, [post]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (newComment.trim() === "") return;

//     const newCommentObj = {
//       id: Date.now(),
//       text: newComment,
//       author: userID || "Anonymous",
//       created_at: new Date().toISOString(),
//     };

//     const updatedComments = [...(post.comments || []), newCommentObj];

//     // Update the post's comments JSONB column
//     await supabase
//       .from("Posts")
//       .update({ comments: updatedComments })
//       .eq("id", post.id);

//     setComments(updatedComments);
//     setNewComment("");
//     if (typeof refetchPosts === "function") refetchPosts();
//   };

//   const updateUpvotes = async (event) => {
//     event.preventDefault();
//     await supabase
//       .from("Posts")
//       .update({ upvoteCount: upvoteCount + 1 })
//       .eq("id", post.id);

//     setUpvotes((upvoteCount) => upvoteCount + 1);
//     if (typeof refetchPosts === "function") refetchPosts();
//   };

//   const deletePost = async (event) => {
//     event.preventDefault();

//     await supabase.from("Posts").delete().eq("id", id);
//     if (typeof refetchPosts === "function") refetchPosts();
//     window.location = "/";
//   };

//   const deleteComment = async (commentId) => {
//     const updatedComments = comments.filter(
//       (comment) => comment.id !== commentId
//     );

//     await supabase
//       .from("Posts")
//       .update({ comments: updatedComments })
//       .eq("id", post.id);

//     setComments(updatedComments);
//     if (typeof refetchPosts === "function") refetchPosts();
//   };

//   function getEmbedUrl(url) {
//     // For YouTube links
//     const youtubeMatch = url.match(
//         /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
//     );
//     if (youtubeMatch) {
//         return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
//     }
//     // For other video links, just return the original URL
//     return url;
//   }

//   if (loading) {
//     return <div className="loading-spinner"></div>;
//   }

  if (!post) {
    return (
      <div>
        <h2>Post not found.</h2>
      </div>
    );
  }

  return (
    <>
      <div className={styles.page}>

        {/* {post.referencedPostID && (
          <div className="ReferencedPost">
            <h4>
              Reposted from:{" "}
              <Link to={`/details/${post.referencedPostID}`}>
                Post #{post.referencedPostID}
              </Link>
            </h4>
            {data &&
              data.length > 0 &&
              (() => {
                  const refPost = data.find(
                      (p) => String(p.id) === String(post.referencedPostID)
                    );
                    return refPost ? (
                  <div className="ReferencedPostPreview">
                    <h4>{refPost.title}</h4>
                    <p>{refPost.content}</p>
                    <hr />
                  </div>
                ) : null;
              })()}
          </div>
        )} */}

        {/* <h3>Posted by {post.userID ? post.userID : "Unknown"}</h3> */}
        <br /><h2>{post.title}</h2>
        {post.imageURL && <img src={post.image_urls[0]} alt={post.title} />}
        {/* {post.videoURL && (
            <div className="video-container">
                <iframe
                width="560"
                height="315"
                src={getEmbedUrl(post.videoURL)}
                title="Web Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
            </div>
        )} */}
        <p>{post.content}</p>
        <br />
        {/* <button className="upvoteButton" onClick={updateUpvotes}>
          🌟 Upvotes: {upvoteCount}
        </button> */}
        <br />
        <br />

        {/* {post.userID === userID ? (
          <>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit this post</button>
            </Link>
            <button className="deleteButton" onClick={deletePost}>
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              className="editButton"
              disabled
              title="You can only edit your own posts"
            >
              Edit this post
            </button>
            <button
              className="deleteButton"
              disabled
              title="You can only delete your own posts"
            >
              Delete
            </button>
          </>
        )} */}

        <br />
        <br />
        <Link href="/journal">Back to all posts</Link>
      </div>

      {/* <div className="Comments">
        <h3>Comments</h3>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="Comment">
              <p>
                {comment.author}: {comment.text}
              </p>
              {post.userID === userID && (
                <button
                  className="deleteCommentButton"
                  onClick={() => deleteComment(comment.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        <h3>Add a Comment</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <br />
          <button type="submit">Add Comment</button>
        </form>
      </div> */}
    </>
  );
};

export default DetailPage;