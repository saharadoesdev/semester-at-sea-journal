'use client';
import { useTransition } from 'react';

export default function DeleteButton({ itemId, itemLabel, deleteAction }) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    if (!window.confirm(`Are you sure you want to delete this ${itemLabel || 'item'}?`)) return;

    const result = await deleteAction(itemId);
    if (!result.success) {
      alert(result.error || 'Failed to delete.');
    }
  }

  return (
    <button onClick={() => startTransition(handleDelete)} disabled={isPending}>
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}