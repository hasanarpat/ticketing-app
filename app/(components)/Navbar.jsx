import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { AiOutlineDingtalk } from 'react-icons/ai';
import { AiTwotoneEdit } from 'react-icons/ai';
import Image from 'next/image';

const Navbar = async () => {
  const session = await getServerSession();

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
        <p className='text-sm'>{session && session.user?.name}</p>
        {session && session.user?.image != undefined && (
          <Image
            alt=''
            src={session.user?.image}
            width={30}
            height={30}
            className='rounded object-fill'
          />
        )}
        {session ? (
          <Link href='/api/auth/signout?callbackUrl=/'>Logout</Link>
        ) : (
          <Link href='/api/auth/signin'>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
