'use client';
import { useRouter } from 'next/navigation';
import { AiOutlineDelete } from 'react-icons/ai';
const DeleteBlock = ({ id }) => {
  const router = useRouter();

  const deleteTicket = async () => {
    const res = await fetch(`/api/v1/tickets/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    });

    if (res.ok) {
      router.refresh();
    }
  };
  return (
    <>
      <AiOutlineDelete
        className="text-red-400 hover:cursor-pointer hover:text-red-200 text-2xl"
        onClick={deleteTicket}
      />
    </>
  );
};
export default DeleteBlock;
