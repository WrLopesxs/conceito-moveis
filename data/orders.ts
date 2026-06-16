import { app } from '@/config/app';

export interface OrderItem {
  name: string;
  quantity: number;
}

export interface Order {
  code: string;
  customer: string;
  /** Telefone do cliente em formato internacional (só números) p/ wa.me */
  phone: string;
  items: OrderItem[];
  createdAt: string; // ISO
  estimatedDelivery: string; // ISO
  /** Índice da etapa atual em app.statuses (0..4) */
  statusIndex: number;
  /** Data em que cada etapa foi atingida (null = ainda não atingida) */
  stepDates: (string | null)[];
}

/**
 * Helper: preenche stepDates até `index` com as datas informadas e o resto null.
 * O total de etapas é app.statuses.length (5).
 */
function steps(dates: string[]): (string | null)[] {
  const total = app.statuses.length;
  const out: (string | null)[] = [];
  for (let i = 0; i < total; i++) out.push(dates[i] ?? null);
  return out;
}

/** Pedidos mockados em diferentes estágios (data base: junho/2026). */
export const seedOrders: Order[] = [
  {
    code: 'PED-1042',
    customer: 'Mariana Alves',
    phone: '5511988887777',
    items: [
      { name: 'Sofá Retrátil 3 Lugares Cinza', quantity: 1 },
      { name: 'Mesa de Centro Carvalho', quantity: 1 },
    ],
    createdAt: '2026-06-02',
    estimatedDelivery: '2026-06-20',
    statusIndex: 1,
    stepDates: steps(['2026-06-02', '2026-06-05']),
  },
  {
    code: 'PED-1043',
    customer: 'Carlos Eduardo Lima',
    phone: '5511977776666',
    items: [{ name: 'Guarda-Roupa 6 Portas Branco', quantity: 1 }],
    createdAt: '2026-05-28',
    estimatedDelivery: '2026-06-18',
    statusIndex: 3,
    stepDates: steps(['2026-05-28', '2026-06-01', '2026-06-10', '2026-06-16']),
  },
  {
    code: 'PED-1044',
    customer: 'Juliana Souza',
    phone: '5511966665555',
    items: [
      { name: 'Cama Box Casal', quantity: 1 },
      { name: 'Cabeceira Estofada Queen', quantity: 1 },
    ],
    createdAt: '2026-06-10',
    estimatedDelivery: '2026-06-28',
    statusIndex: 0,
    stepDates: steps(['2026-06-10']),
  },
  {
    code: 'PED-1045',
    customer: 'Roberto Nogueira',
    phone: '5511955554444',
    items: [{ name: 'Estante para TV 1,80m', quantity: 1 }],
    createdAt: '2026-05-20',
    estimatedDelivery: '2026-06-12',
    statusIndex: 4,
    stepDates: steps(['2026-05-20', '2026-05-24', '2026-06-02', '2026-06-08', '2026-06-12']),
  },
  {
    code: 'PED-1046',
    customer: 'Patrícia Mendes',
    phone: '5511944443333',
    items: [
      { name: 'Conjunto Mesa de Jantar 6 Cadeiras', quantity: 1 },
      { name: 'Buffet 4 Portas', quantity: 1 },
    ],
    createdAt: '2026-06-08',
    estimatedDelivery: '2026-06-30',
    statusIndex: 1,
    stepDates: steps(['2026-06-08', '2026-06-12']),
  },
  {
    code: 'PED-1047',
    customer: 'Fernando Castro',
    phone: '5511933332222',
    items: [{ name: 'Poltrona Decorativa Veludo Verde', quantity: 2 }],
    createdAt: '2026-06-13',
    estimatedDelivery: '2026-06-26',
    statusIndex: 0,
    stepDates: steps(['2026-06-13']),
  },
  {
    code: 'PED-1048',
    customer: 'Aline Ribeiro',
    phone: '5511922221111',
    items: [
      { name: 'Escrivaninha Home Office', quantity: 1 },
      { name: 'Cadeira de Escritório Ergonômica', quantity: 1 },
    ],
    createdAt: '2026-05-30',
    estimatedDelivery: '2026-06-17',
    statusIndex: 2,
    stepDates: steps(['2026-05-30', '2026-06-03', '2026-06-14']),
  },
  {
    code: 'PED-1049',
    customer: 'Marcos Tavares',
    phone: '5511911110000',
    items: [{ name: 'Rack Industrial com Painel', quantity: 1 }],
    createdAt: '2026-06-05',
    estimatedDelivery: '2026-06-22',
    statusIndex: 2,
    stepDates: steps(['2026-06-05', '2026-06-09', '2026-06-15']),
  },
];
