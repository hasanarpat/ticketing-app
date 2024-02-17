import { getServerSession } from 'next-auth';
import TicketCard from './(components)/TicketCard';
import { options } from './api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

const getData = async () => {
  try {
    const res = await fetch('http:localhost:3000/api/tickets', {
      cache: 'no-store',
    });
    return await res.json();
  } catch (error) {
    console.log('Failed to get tickets', error);
  }
};

export default async function Home() {
  const session = await getServerSession(options);

  if (!session) redirect('/api/auth/signin?callbackUrl=/');

  const tickets = await getData();

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div
              key={categoryIndex}
              className="mb-4"
            >
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4 3xl:grid-cols-5">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      key={_index}
                      id={_index}
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
