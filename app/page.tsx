'use client';

import { useState } from 'react';
import { useOrders } from '@/components/OrdersProvider';
import Timeline from '@/components/Timeline';
import { app } from '@/config/app';
import { formatDate } from '@/lib/format';
import type { Order } from '@/data/orders';

export default function HomePage() {
  const { getByCode, hydrated } = useOrders();
  const [code, setCode] = useState('');
  const [result, setResult] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const found = getByCode(code) ?? null;
    setResult(found);
    setSearched(true);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-neutral-900">Acompanhe seu pedido</h1>
        <p className="mt-2 text-neutral-500">
          Digite o código do seu pedido (ex.: <strong>PED-1042</strong>) para ver o andamento.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
      >
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="PED-0000"
          className="flex-1 rounded-xl border border-neutral-300 bg-white px-4 py-3 text-center uppercase tracking-wider outline-none transition focus:border-primary sm:text-left"
        />
        <button
          type="submit"
          disabled={!hydrated}
          className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50"
        >
          Consultar
        </button>
      </form>

      {searched && !result && (
        <div className="mx-auto mt-8 max-w-md rounded-xl border border-amber-200 bg-amber-50 p-4 text-center text-amber-800">
          Não encontramos um pedido com esse código. Confira e tente novamente.
        </div>
      )}

      {result && (
        <div className="mt-10 overflow-hidden rounded-2xl border border-secondary bg-white shadow-sm">
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
              <p className="mt-4 rounded-lg bg-primary/5 px-3 py-2 text-sm text-primary">
                Status atual: <strong>{app.statuses[result.statusIndex]}</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      <p className="mt-10 text-center text-sm text-neutral-400">
        Dica: experimente os códigos <strong>PED-1042</strong>, <strong>PED-1045</strong> ou{' '}
        <strong>PED-1048</strong>.
      </p>
    </div>
  );
}
