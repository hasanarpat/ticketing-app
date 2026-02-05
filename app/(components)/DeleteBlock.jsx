'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DeleteBlock = ({ id }) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const deleteTicket = async () => {
    if (deleting) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/v1/tickets/${id}`, {
        method: 'DELETE',
        credentials: 'same-origin',
      });
      if (res.ok) router.refresh();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={deleteTicket}
      disabled={deleting}
      className="text-retro-red hover:text-retro-orange border border-retro-red hover:border-retro-orange px-1 text-[10px] uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Sil"
    >
      {deleting ? '...' : '[X]'}
    </button>
  );
};

export default DeleteBlock;
