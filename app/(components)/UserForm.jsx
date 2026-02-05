'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    const res = await fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      setErr(data?.error?.message || 'Kayıt başarısız');
    } else {
      router.refresh();
      router.push('/');
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-full max-w-md pixel-box p-4"
      >
        <h1 className="text-retro-cyan text-sm">[ NEW USER ]</h1>
        <label>Name</label>
        <input
          id="name"
          name="name"
          onChange={handleChange}
          required
          value={formData.name ?? ''}
          type="text"
        />
        <label>Email</label>
        <input
          id="email"
          name="email"
          onChange={handleChange}
          required
          value={formData.email ?? ''}
          type="email"
        />
        <label>Password</label>
        <input
          id="password"
          name="password"
          onChange={handleChange}
          required
          value={formData.password ?? ''}
          type="password"
        />
        <input type="submit" value="[ CREATE USER ]" className="btn mt-2" />
      </form>
      {err && <p className="mt-2 text-retro-red text-xs">{err}</p>}
    </div>
  );
};

export default UserForm;
