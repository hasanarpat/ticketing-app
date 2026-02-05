import { cookies } from 'next/headers';
import TicketCard from './(components)/TicketCard';
import EmptyStateLanding from './(components)/EmptyStateLanding';
import { getV1Session } from '@/lib/auth-v1';
import { redirect } from 'next/navigation';

async function getTickets(cookieHeader) {
  try {
    const base = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/v1/tickets`, {
      cache: 'no-store',
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
    });
    const data = await res.json();
    if (!res.ok || !data?.success) return [];
    return Array.isArray(data.data) ? data.data : [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const cookieStore = await cookies();
  const session = await getV1Session(cookieStore.toString());

  if (!session) redirect('/login?callbackUrl=/');

  const tickets = await getTickets(cookieStore.toString());
  const uniqueCategories = [
    ...new Set(tickets.map((t) => t.category).filter(Boolean)),
  ];

  if (tickets.length === 0) {
    return <EmptyStateLanding />;
  }

  return (
    <div className="p-4 sm:p-6">
      <div>
        {uniqueCategories.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex} className="mb-6">
            <h2 className="text-retro-cyan border-b-2 border-retro-border pb-2 mb-3">
              [{uniqueCategory}]
            </h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4 3xl:grid-cols-5">
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket, index) => (
                  <TicketCard
                    key={filteredTicket._id ?? index}
                    id={filteredTicket._id ?? index}
                    ticket={filteredTicket}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
