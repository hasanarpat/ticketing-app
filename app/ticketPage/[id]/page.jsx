import TicketForm from '../(components)/TicketForm';
import { cookies } from 'next/headers';
import { getV1Session } from '@/lib/auth-v1';
import { redirect } from 'next/navigation';

async function getTicketById(id, cookieHeader) {
  const base = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const res = await fetch(`${base}/api/v1/tickets/${id}`, {
    cache: 'no-store',
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });
  if (!res.ok) throw new Error('Failed to fetch ticket.');
  const data = await res.json();
  return data?.data ?? null;
}

export default async function SingleTicket({ params }) {
  const cookieStore = await cookies();
  const session = await getV1Session(cookieStore.toString());

  if (!session) redirect('/login?callbackUrl=/ticketPage/' + params.id);

  const EDITMODE = params.id !== 'new';
  let updateTicketdata = { _id: 'new' };

  if (EDITMODE) {
    const ticket = await getTicketById(params.id, cookieStore.toString());
    if (ticket) updateTicketdata = { ...ticket, _id: ticket._id ?? params.id };
  }

  return (
    <div>
      <TicketForm ticket={updateTicketdata} />
    </div>
  );
}
