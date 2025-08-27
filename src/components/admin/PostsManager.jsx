'use client';
import Link from 'next/link';
import { deletePostAction } from "@/app/actions";
import DeleteButton from './DeleteButton';

export default function PostsManager({ initialPosts }) {
  const posts = initialPosts || [];

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
              <td>{new Date(post.display_date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
              <td>
                <Link href={`/admin/edit/${post.slug}`}>Edit</Link>
                <DeleteButton
                  itemId={post.id}
                  itemLabel="post"
                  deleteAction={id => deletePostAction({ postId: id, postSlug: post.slug })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}