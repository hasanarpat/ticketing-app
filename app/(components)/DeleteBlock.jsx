'use client';
import { useRouter } from 'next/navigation';
import { AiOutlineDelete } from 'react-icons/ai';
const DeleteBlock = ({ id }) => {
  const router = useRouter();

  const deleteTicket = async () => {
    const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      method: 'DELETE',
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
