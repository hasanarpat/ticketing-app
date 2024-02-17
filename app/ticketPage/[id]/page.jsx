import TicketForm from '@/app/(components)/TicketForm';
import { getServerSession } from 'next-auth';
import React from 'react';
import { redirect } from 'next/navigation';

const getTicketById = async (id) => {
  const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch ticket.');

  return await res.json();
};

const SingleTicket = async ({ params }) => {
  const EDITMODE = params.id === 'new' ? false : true;
  let updateTicketdata = {};

  if (EDITMODE) {
    updateTicketdata = await getTicketById(params.id);
  } else {
    updateTicketdata = {
      _id: 'new',
    };
  }

  const session = await getServerSession();

  if (session.user.role != 'admin') redirect('/');

  return (
    <div>
      <TicketForm ticket={updateTicketdata} />
    </div>
  );
};

export default SingleTicket;
