# Conceito Móveis — Rastreio de Pedido

Sistema de acompanhamento de pedidos **mobile-first** para uma loja de móveis. Reduz as ligações de _"cadê meu pedido?"_ deixando o cliente consultar o andamento sozinho, com uma timeline visual.

Stack: **Next.js 14 (App Router) · TypeScript · Tailwind CSS**. Idioma pt-BR. Sem backend — persistência em `localStorage`.

## ✨ Funcionalidades

### Cliente (público) — `/`
- Campo para digitar o código do pedido (ex.: `PED-1042`).
- Timeline de status com ícones: **Pedido confirmado → Em produção → Pronto p/ entrega → A caminho → Entregue**, com data por etapa e a etapa atual destacada.
- Previsão de entrega e resumo dos itens.

### Admin — `/admin` (login fake)
- Lista de pedidos (código, cliente, status atual, previsão).
- Criar novo pedido (cliente, itens, previsão).
- **Avançar etapa** em 1 clique.
- **Avisar cliente no WhatsApp**: gera o link `wa.me` com a mensagem do status atual.

> Login da demo: usuário **admin** / senha **conceito123** (configurável em [`config/app.ts`](config/app.ts)).
> É um login _fake_ client-side, apenas para a demonstração — não use como segurança real.

## 🚀 Rodando localmente

> Precisa do [Node.js 18+](https://nodejs.org).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera a pasta /out (site estático)
```

## 🎨 Trocar o branding

Tudo em [`config/app.ts`](config/app.ts): `name`, `logoImage`, `colors`, `whatsappNumber`, credenciais do `admin` e as `statuses` (etapas).

Os pedidos de demonstração estão em [`data/orders.ts`](data/orders.ts). Quando o app roda, eles são copiados para o `localStorage` na primeira visita; depois disso o estado fica salvo no navegador (use _"Restaurar pedidos de demonstração"_ no admin para resetar).

## ☁️ Deploy no GitHub Pages (automático)

Já incluso o workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). A cada `push` na `main`, builda e publica.

1. GitHub: **Settings → Pages → Source: GitHub Actions**.
2. `push` na `main`. O site sai em `https://WrLopesxs.github.io/conceito-moveis/`.

> O nome do repositório está em [`next.config.mjs`](next.config.mjs) (`REPO`), usado como `basePath`. Renomeou o repo? Ajuste lá.

## ▲ Deploy na Vercel (alternativa)

Importe o repo em [vercel.com/new](https://vercel.com/new) — o Next.js é detectado automaticamente. Como na Vercel não há subpasta, o `basePath` fica vazio (só é aplicado no build de produção do Pages).
