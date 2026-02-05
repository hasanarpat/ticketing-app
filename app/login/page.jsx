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
    if (loading) return;
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'same-origin',
      });
      await res.json();
      if (!res.ok) {
        setError('E-posta veya şifre hatalı.');
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError('Bağlantı hatası. Tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-sm pixel-box p-6">
        <h1 className="text-retro-green text-center mb-6 text-sm">[ GIRIS ]</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <label>Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {error && <p className="text-retro-red text-xs">{error}</p>}
          <button type="submit" disabled={loading} className="btn mt-2">
            {loading ? '...' : '[ GIRIS YAP ]'}
          </button>
        </form>
        <p className="mt-4 text-center text-retro-muted text-[10px]">
          Hesabınız yok mu? <Link href="/register">[ KAYIT ]</Link>
        </p>
      </div>
    </div>
  );
}
