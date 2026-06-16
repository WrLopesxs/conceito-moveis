import { app } from '@/config/app';
import { formatDate } from '@/lib/format';
import type { Order } from '@/data/orders';

/** Monta uma URL wa.me. Usa o telefone do pedido, se houver. */
export function waLink(message: string, phone?: string): string {
  const number = (phone || app.whatsappNumber).replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Mensagem que o ADMIN envia ao cliente avisando do status atual. */
export function statusUpdateMessage(order: Order): string {
  const status = app.statuses[order.statusIndex];
  const isDone = order.statusIndex === app.statuses.length - 1;

  const base =
    `Olá, ${order.customer}! 👋\n\n` +
    `Atualização do seu pedido *${order.code}* na ${app.name}:\n\n` +
    `📦 Status: *${status}*\n`;

  if (isDone) {
    return base + `\nSeu pedido foi entregue. Obrigado pela preferência! 🛋️`;
  }

  return (
    base +
    `🗓️ Previsão de entrega: ${formatDate(order.estimatedDelivery)}\n\n` +
    `Qualquer dúvida, é só responder por aqui. 😊`
  );
}
