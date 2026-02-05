import DeleteBlock from './DeleteBlock';
import Priority from './Priority';
import ProgressBar from './ProgressBar';
import StatusDisplay from './StatusDisplay';
import Link from 'next/link';

const TicketCard = ({ ticket }) => {
  const formatTimeStamp = (timeStamp) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    const date = new Date(timeStamp);
    return date.toLocaleString('en-us', options);
  };

  return (
    <div className="pixel-box p-3 m-2 hover:border-retro-border-bright transition-colors">
      <div className="flex mb-2">
        <Priority priority={ticket.priority} />
        <div className="ml-auto">
          <DeleteBlock id={ticket._id} />
        </div>
      </div>
      <Link href={`/ticketPage/${ticket._id}`} className="block" style={{ display: 'contents' }}>
        <h4 className="text-retro-cyan mb-1">{ticket.title}</h4>
        <div className="h-0.5 bg-retro-border mb-2" />
        <p className="whitespace-pre-wrap text-retro-muted text-xs mb-2 line-clamp-2">
          {ticket.description}
        </p>
        <div className="flex-grow" />
        <div className="flex mt-2 items-end justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-retro-muted text-[10px]">{formatTimeStamp(ticket.createdAt)}</p>
            <ProgressBar progress={ticket.progress} />
          </div>
          <StatusDisplay status={ticket.status} />
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
