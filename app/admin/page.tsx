'use client';

import { useEffect, useState } from 'react';
import { app } from '@/config/app';
import AdminDashboard from '@/components/AdminDashboard';

const AUTH_KEY = 'conceito-admin-auth';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setAuthed(sessionStorage.getItem(AUTH_KEY) === '1');
    setReady(true);
  }, []);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (user === app.admin.username && pass === app.admin.password) {
      sessionStorage.setItem(AUTH_KEY, '1');
      setAuthed(true);
      setError('');
    } else {
      setError('Usuário ou senha incorretos.');
    }
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    setUser('');
    setPass('');
  }

  if (!ready) return null;

  if (!authed) {
    return (
      <div className="mx-auto flex max-w-sm flex-col px-4 py-16">
        <h1 className="text-center text-2xl font-bold text-neutral-900">Área administrativa</h1>
        <p className="mt-1 text-center text-sm text-neutral-500">
          Acesse para gerenciar os pedidos.
        </p>

        <form onSubmit={login} className="mt-8 space-y-4 rounded-2xl border border-secondary bg-white p-6 shadow-sm">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-600">Usuário</label>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none transition focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-600">Senha</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none transition focus:border-primary"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-2.5 font-semibold text-white transition hover:bg-primary-dark"
          >
            Entrar
          </button>
          <p className="text-center text-xs text-neutral-400">
            Demo: <strong>{app.admin.username}</strong> / <strong>{app.admin.password}</strong>
          </p>
        </form>
      </div>
    );
  }

  return <AdminDashboard onLogout={logout} />;
}
