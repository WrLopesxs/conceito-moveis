'use client';

import { useState } from 'react';
import { useOrders } from '@/components/OrdersProvider';
import Timeline from '@/components/Timeline';
import { app } from '@/config/app';
import { formatDate } from '@/lib/format';
import type { Order } from '@/data/orders';

const EXAMPLES = ['PED-1042', 'PED-1045', 'PED-1048'];

export default function HomePage() {
  const { getByCode, hydrated } = useOrders();
  const [code, setCode] = useState('');
  const [result, setResult] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  function search(value: string) {
    const found = getByCode(value) ?? null;
    setResult(found);
    setSearched(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    search(code);
  }

  function useExample(c: string) {
    setCode(c);
    search(c);
  }

  const progress = result
    ? Math.round((result.statusIndex / (app.statuses.length - 1)) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      {/* Cabeçalho */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} stroke="currentColor" className="h-7 w-7">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-neutral-900">Acompanhe seu pedido</h1>
        <p className="mt-2 text-neutral-500">
          Digite o código do seu pedido para ver o andamento em tempo real.
        </p>
      </div>

      {/* Busca */}
      <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="PED-0000"
          className="flex-1 rounded-xl border border-neutral-300 bg-white px-4 py-3 text-center font-semibold uppercase tracking-wider outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 sm:text-left"
        />
        <button
          type="submit"
          disabled={!hydrated}
          className="rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark disabled:opacity-50"
        >
          Consultar
        </button>
      </form>

      {/* Exemplos clicáveis */}
      <div className="mx-auto mt-4 flex max-w-md flex-wrap items-center justify-center gap-2 text-sm">
        <span className="text-neutral-400">Exemplos:</span>
        {EXAMPLES.map((c) => (
          <button
            key={c}
            onClick={() => useExample(c)}
            className="rounded-full border border-secondary bg-white px-3 py-1 font-medium text-primary transition hover:bg-secondary"
          >
            {c}
          </button>
        ))}
      </div>

      {searched && !result && (
        <div className="mx-auto mt-8 max-w-md animate-fade-up rounded-xl border border-amber-200 bg-amber-50 p-4 text-center text-amber-800">
          Não encontramos um pedido com esse código. Confira e tente novamente.
        </div>
      )}

      {result && (
        <div
          key={result.code}
          className="mt-10 animate-fade-up overflow-hidden rounded-2xl border border-secondary bg-white shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 bg-secondary px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-neutral-500">Pedido</p>
              <p className="text-lg font-bold text-primary">{result.code}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                Previsão de entrega
              </p>
              <p className="font-semibold text-neutral-800">
                {formatDate(result.estimatedDelivery)}
              </p>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="px-6 pt-5">
            <div className="mb-1 flex items-center justify-between text-xs text-neutral-500">
              <span>{app.statuses[result.statusIndex]}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full origin-left animate-grow-x rounded-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Andamento
              </h2>
              <Timeline order={result} />
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Resumo
              </h2>
              <p className="mb-3 text-sm text-neutral-600">
                Cliente: <strong>{result.customer}</strong>
              </p>
              <ul className="space-y-2">
                {result.items.map((it, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-2 text-sm"
                  >
                    <span className="text-neutral-700">{it.name}</span>
                    <span className="font-medium text-neutral-500">x{it.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
