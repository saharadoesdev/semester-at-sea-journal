'use client';
import Link from 'next/link';

export default function PostsManager({ initialPosts }) {
  const posts = initialPosts || [];
  console.log(posts)

  return (
    <div>
      <Link href="/admin/create" className="create-post-button">
        + Create New Post
      </Link>

      <table style={{ borderSpacing: "18px" }} className="posts-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{new Date(post.display_date).toLocaleDateString()}</td>
              <td>
                <Link href={`/admin/edit/${post.slug}`}>Edit</Link>
                {/* need another small component for delete */}
                {/* <DeleteButton postId={post.id} /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}