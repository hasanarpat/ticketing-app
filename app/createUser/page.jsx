import UserForm from '../(components)/UserForm';
import { cookies } from 'next/headers';
import { getV1Session } from '@/lib/auth-v1';
import { redirect } from 'next/navigation';

export default async function CreateUser() {
  const cookieStore = await cookies();
  const session = await getV1Session(cookieStore.toString());

  if (!session) redirect('/login?callbackUrl=/createUser');
  if (session.role !== 'admin') redirect('/');

  return (
    <div>
      <UserForm />
    </div>
  );
}
