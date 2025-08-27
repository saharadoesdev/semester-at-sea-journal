'use client';
import { useTransition } from 'react';
import { deletePostAction } from '@/app/actions';

export default function DeleteButton({ postId, postSlug }) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    const result = await deletePostAction({ postId, postSlug });
    if (!result.success) {
      alert(result.error || 'Failed to delete post.');
    }
  }

  return (
    <button onClick={() => startTransition(handleDelete)} disabled={isPending}>
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}