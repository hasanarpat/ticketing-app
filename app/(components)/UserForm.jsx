'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        className="flex flex-col gap-3 w-1/2"
      >
        <h1>Create New User</h1>
        <input
          id="name"
          name="name"
          onChange={handleChange}
          required
          value={formData.name}
          type="text"
          className="m-2 bg-slate-400 rounded"
        />
        <input
          id="email"
          name="email"
          onChange={handleChange}
          required
          value={formData.email}
          type="text"
          className="m-2 bg-slate-400 rounded"
        />
        <input
          id="password"
          name="password"
          onChange={handleChange}
          required
          value={formData.password}
          type="password"
          className="m-2 bg-slate-400 rounded"
        />
        <input
          type="submit"
          value="Create user"
          className="bg-blue-300"
        />
      </form>
      <p className="text-red-500">{err}</p>
    </div>
  );
};

export default UserForm;
