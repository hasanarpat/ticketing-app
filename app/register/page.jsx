import UserForm from '../(components)/UserForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-retro-green text-sm mb-2 text-center">[ KAYIT OL ]</h1>
        <p className="text-retro-muted text-[10px] text-center mb-4">
          Yeni hesap oluşturun
        </p>
        <UserForm />
        <p className="mt-4 text-center text-retro-muted text-[10px]">
          Zaten hesabınız var mı? <Link href="/login">[ GIRIS ]</Link>
        </p>
      </div>
    </div>
  );
}
