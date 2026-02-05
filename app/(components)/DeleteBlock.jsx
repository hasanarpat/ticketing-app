'use client';
import { useRouter } from 'next/navigation';

const DeleteBlock = ({ id }) => {
  const router = useRouter();

  const deleteTicket = async () => {
    const res = await fetch(`/api/v1/tickets/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    });
    if (res.ok) router.refresh();
  };

  return (
    <button
      type="button"
      onClick={deleteTicket}
      className="text-retro-red hover:text-retro-orange border border-retro-red hover:border-retro-orange px-1 text-[10px] uppercase transition-colors"
      aria-label="Sil"
    >
      [X]
    </button>
  );
};

export default DeleteBlock;
