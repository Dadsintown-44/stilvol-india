'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('vinaymore0110@gmail.com');
  const [password, setPassword] = useState('1201');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!response.ok) {
      setError('Invalid admin credentials');
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md bg-white border border-stone-200 p-6 rounded">
      <h1 className="text-2xl text-[#1F2937] mb-4">Admin Login</h1>

      <label className="block mb-3 text-sm text-gray-700">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full border border-stone-300 px-3 py-2 rounded"
          required
        />
      </label>

      <label className="block mb-4 text-sm text-gray-700">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full border border-stone-300 px-3 py-2 rounded"
          required
        />
      </label>

      {error ? <p className="text-sm text-red-600 mb-3">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#39795F] text-white py-2 rounded disabled:opacity-70"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
