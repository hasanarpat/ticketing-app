import { cookies } from 'next/headers';
import Link from 'next/link';
import { AiOutlineDingtalk } from 'react-icons/ai';
import { AiTwotoneEdit } from 'react-icons/ai';
import { getV1Session } from '@/lib/auth-v1';

const Navbar = async () => {
  const cookieStore = await cookies();
  const session = await getV1Session(cookieStore.toString());

  return (
    <nav className='flex items-center justify-between bg-nav p-4'>
      <div className=' text-default flex items-center space-x-4 text-3xl'>
        <Link href='/'>
          <AiOutlineDingtalk />
        </Link>
        <Link href='/ticketPage/new'>
          <AiTwotoneEdit />
        </Link>
      </div>
      <div className='flex gap-4 font-bold items-center text-default'>
        {session && <p className='text-sm'>{session.name}</p>}
        {session ? (
          <form action="/api/v1/auth/logout" method="POST">
            <button type="submit" className="hover:underline">Çıkış</button>
          </form>
        ) : (
          <Link href="/login">Giriş yap</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
