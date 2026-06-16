/**
 * ============================================================
 *  CONFIGURAÇÃO DO APP — altere tudo por aqui
 * ============================================================
 */

export const app = {
  /** Nome exibido no cabeçalho e título */
  name: 'Conceito Móveis',

  /** Frase de apoio */
  tagline: 'Acompanhe seu pedido em tempo real',

  /** Logo. Texto (deixe vazio) ou imagem em /public (ex: '/logo.png') */
  logoImage: '',

  /** Cores do tema */
  colors: {
    primary: '#1B5FA8', // azul Conceito Móveis
    primaryDark: '#14497F',
    secondary: '#E8F1FA',
  },

  /** WhatsApp em formato internacional, só números */
  whatsappNumber: '5511999999999',

  /**
   * Login do ADMIN (demo). Em produção use um backend de verdade —
   * isto é apenas um login fake client-side para a demonstração.
   */
  admin: {
    username: 'admin',
    password: 'conceito123',
  },

  /** Etapas do pedido, em ordem. A primeira é o início, a última é a conclusão. */
  statuses: [
    'Pedido confirmado',
    'Em produção',
    'Pronto p/ entrega',
    'A caminho',
    'Entregue',
  ] as const,
};

export type OrderStatus = (typeof app.statuses)[number];
