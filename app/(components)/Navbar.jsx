import Link from 'next/link';
import { AiOutlineDingtalk } from 'react-icons/ai';
import { AiTwotoneEdit } from 'react-icons/ai';
const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-nav p-4">
      <div className=" text-default flex items-center space-x-4 text-3xl">
        <Link href="/">
          <AiOutlineDingtalk />
        </Link>
        <Link href="/ticketPage/new">
          <AiTwotoneEdit />
        </Link>
      </div>
      <div>
        <p className="text-default">crow@gmail.com</p>
      </div>
    </nav>
  );
};

export default Navbar;
