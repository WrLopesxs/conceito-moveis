'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { app } from '@/config/app';
import { seedOrders, type Order, type OrderItem } from '@/data/orders';
import { todayISO } from '@/lib/format';

interface NewOrderInput {
  customer: string;
  phone: string;
  items: OrderItem[];
  estimatedDelivery: string;
}

interface OrdersContextValue {
  orders: Order[];
  hydrated: boolean;
  getByCode: (code: string) => Order | undefined;
  advanceStatus: (code: string) => void;
  addOrder: (input: NewOrderInput) => Order;
  resetDemo: () => void;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);
const STORAGE_KEY = 'conceito-orders';

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setOrders(raw ? JSON.parse(raw) : seedOrders);
    } catch {
      setOrders(seedOrders);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      /* indisponível */
    }
  }, [orders, hydrated]);

  const getByCode = useCallback(
    (code: string) =>
      orders.find((o) => o.code.toUpperCase() === code.trim().toUpperCase()),
    [orders],
  );

  const advanceStatus = useCallback((code: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.code !== code) return o;
        const next = Math.min(o.statusIndex + 1, app.statuses.length - 1);
        if (next === o.statusIndex) return o;
        const stepDates = [...o.stepDates];
        stepDates[next] = todayISO();
        return { ...o, statusIndex: next, stepDates };
      }),
    );
  }, []);

  const addOrder = useCallback((input: NewOrderInput) => {
    const order: Order = {
      code: `PED-${Math.floor(1050 + Math.random() * 8950)}`,
      customer: input.customer,
      phone: input.phone.replace(/\D/g, ''),
      items: input.items,
      createdAt: todayISO(),
      estimatedDelivery: input.estimatedDelivery,
      statusIndex: 0,
      stepDates: app.statuses.map((_, i) => (i === 0 ? todayISO() : null)),
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const resetDemo = useCallback(() => setOrders(seedOrders), []);

  return (
    <OrdersContext.Provider
      value={{ orders, hydrated, getByCode, advanceStatus, addOrder, resetDemo }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders(): OrdersContextValue {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders deve ser usado dentro de <OrdersProvider>');
  return ctx;
}
