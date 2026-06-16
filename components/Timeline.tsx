import { app } from '@/config/app';
import { formatDate } from '@/lib/format';
import type { Order } from '@/data/orders';

const icons = [
  // Pedido confirmado
  'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  // Em produção
  'M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z',
  // Pronto p/ entrega
  'm21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9',
  // A caminho
  'M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
  // Entregue
  'm2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
];

export default function Timeline({ order }: { order: Order }) {
  return (
    <ol className="relative">
      {app.statuses.map((status, i) => {
        const done = i < order.statusIndex;
        const current = i === order.statusIndex;
        const reached = done || current;
        const isLast = i === app.statuses.length - 1;

        return (
          <li key={status} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Linha conectora */}
            {!isLast && (
              <span
                className={`absolute left-5 top-11 h-[calc(100%-1.5rem)] w-0.5 ${
                  done ? 'bg-primary' : 'bg-neutral-200'
                }`}
                aria-hidden
              />
            )}

            {/* Ícone */}
            <span
              className={`relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full ring-4 ring-white transition ${
                reached ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-400'
              } ${current ? 'scale-110 shadow-lg shadow-primary/30' : ''}`}
            >
              {current && (
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" aria-hidden />
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={icons[i]} />
              </svg>
            </span>

            {/* Texto */}
            <div className="pt-1">
              <p
                className={`font-semibold ${
                  current ? 'text-primary' : reached ? 'text-neutral-800' : 'text-neutral-400'
                }`}
              >
                {status}
                {current && (
                  <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    Etapa atual
                  </span>
                )}
              </p>
              <p className="text-sm text-neutral-500">{formatDate(order.stepDates[i])}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
