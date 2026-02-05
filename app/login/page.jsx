'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'same-origin',
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error?.message || 'Giriş başarısız');
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError('Bağlantı hatası');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-card rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-default mb-6 text-center">Giriş yap</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-default">E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded bg-page p-2 text-default border border-card-hover"
            autoComplete="email"
          />
          <label className="text-default">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded bg-page p-2 text-default border border-card-hover"
            autoComplete="current-password"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn mt-2 disabled:opacity-50"
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş yap'}
          </button>
        </form>
        <p className="mt-4 text-center text-default/80 text-sm">
          Hesabınız yok mu?{' '}
          <Link href="/createUser" className="text-blue-accent hover:underline">
            Kayıt ol
          </Link>
        </p>
      </div>
    </div>
  );
}
