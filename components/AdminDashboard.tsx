'use client';

import { useState } from 'react';
import { useOrders } from '@/components/OrdersProvider';
import { app } from '@/config/app';
import { formatDate } from '@/lib/format';
import { statusUpdateMessage, waLink } from '@/lib/whatsapp';

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { orders, advanceStatus, addOrder, resetDemo } = useOrders();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Pedidos</h1>
          <p className="text-sm text-neutral-500">{orders.length} pedido(s) cadastrado(s)</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm((s) => !s)}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            {showForm ? 'Fechar' : '+ Novo pedido'}
          </button>
          <button
            onClick={onLogout}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50"
          >
            Sair
          </button>
        </div>
      </div>

      {showForm && <NewOrderForm onCreate={() => setShowForm(false)} addOrder={addOrder} />}

      <div className="overflow-x-auto rounded-2xl border border-secondary bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-4 py-3">Código</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Status atual</th>
              <th className="px-4 py-3">Previsão</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary">
            {orders.map((order) => {
              const isDone = order.statusIndex === app.statuses.length - 1;
              return (
                <tr key={order.code} className="align-middle">
                  <td className="px-4 py-3 font-semibold text-primary">{order.code}</td>
                  <td className="px-4 py-3 text-neutral-700">{order.customer}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                        isDone
                          ? 'bg-green-100 text-green-700'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {app.statuses[order.statusIndex]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {formatDate(order.estimatedDelivery)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-end gap-2">
                      <button
                        onClick={() => advanceStatus(order.code)}
                        disabled={isDone}
                        className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {isDone ? 'Concluído' : 'Avançar etapa →'}
                      </button>
                      <a
                        href={waLink(statusUpdateMessage(order), order.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-95"
                      >
                        Avisar no WhatsApp
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        onClick={resetDemo}
        className="mt-4 text-xs text-neutral-400 underline transition hover:text-primary"
      >
        Restaurar pedidos de demonstração
      </button>
    </div>
  );
}

function NewOrderForm({
  onCreate,
  addOrder,
}: {
  onCreate: () => void;
  addOrder: ReturnType<typeof useOrders>['addOrder'];
}) {
  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const [itemsText, setItemsText] = useState('');
  const [delivery, setDelivery] = useState('');
  const [created, setCreated] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const items = itemsText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((name) => ({ name, quantity: 1 }));

    if (!customer || items.length === 0 || !delivery) return;

    const order = addOrder({ customer, phone, items, estimatedDelivery: delivery });
    setCreated(order.code);
    setCustomer('');
    setPhone('');
    setItemsText('');
    setDelivery('');
  }

  return (
    <form
      onSubmit={submit}
      className="mb-6 grid gap-4 rounded-2xl border border-secondary bg-white p-6 shadow-sm md:grid-cols-2"
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-neutral-600">Cliente</label>
        <input
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none transition focus:border-primary"
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-neutral-600">
          WhatsApp do cliente (só números)
        </label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="5511988887777"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none transition focus:border-primary"
        />
      </div>
      <div className="md:col-span-2">
        <label className="mb-1 block text-sm font-medium text-neutral-600">
          Itens (um por linha)
        </label>
        <textarea
          value={itemsText}
          onChange={(e) => setItemsText(e.target.value)}
          rows={3}
          placeholder={'Sofá 3 Lugares\nMesa de Centro'}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none transition focus:border-primary"
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-neutral-600">
          Previsão de entrega
        </label>
        <input
          type="date"
          value={delivery}
          onChange={(e) => setDelivery(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none transition focus:border-primary"
          required
        />
      </div>
      <div className="flex items-end gap-3">
        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2 font-semibold text-white transition hover:bg-primary-dark"
        >
          Criar pedido
        </button>
        {created && (
          <span className="text-sm text-green-600">
            Criado: <strong>{created}</strong>
          </span>
        )}
        <button
          type="button"
          onClick={onCreate}
          className="ml-auto text-sm text-neutral-400 underline"
        >
          fechar
        </button>
      </div>
    </form>
  );
}
