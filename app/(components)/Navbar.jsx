import { cookies } from 'next/headers';
import Link from 'next/link';
import { getV1Session } from '@/lib/auth-v1';

const Navbar = async () => {
  const cookieStore = await cookies();
  const session = await getV1Session(cookieStore.toString());

  return (
    <nav className="flex items-center justify-between border-b-2 border-retro-border bg-retro-panel px-4 py-3">
      <div className="flex items-center gap-4 text-retro-text">
        <Link
          href="/"
          className="text-retro-cyan hover:text-retro-green transition-colors text-sm"
        >
          [HOME]
        </Link>
        <Link
          href="/ticketPage/new"
          className="text-retro-cyan hover:text-retro-green transition-colors text-sm"
        >
          [+ NEW]
        </Link>
      </div>
      <div className="flex gap-4 items-center text-sm">
        {session && (
          <span className="text-retro-muted uppercase">@{session.name}</span>
        )}
        {session ? (
          <form action="/api/v1/auth/logout" method="POST">
            <button
              type="submit"
              className="text-retro-red hover:text-retro-orange transition-colors uppercase"
            >
              [EXIT]
            </button>
          </form>
        ) : (
          <Link href="/login" className="text-retro-green hover:text-retro-cyan uppercase">
            [LOGIN]
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
