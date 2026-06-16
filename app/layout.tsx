import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { app } from '@/config/app';
import { OrdersProvider } from '@/components/OrdersProvider';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${app.name} — ${app.tagline}`,
  description: app.tagline,
};

// Converte "#1b5fa8" -> "27 95 168" (canais RGB que o Tailwind usa com /opacidade).
function rgbChannels(hex: string): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

const brandingStyle = `:root{--color-primary:${rgbChannels(app.colors.primary)};--color-primary-dark:${rgbChannels(app.colors.primaryDark)};--color-secondary:${rgbChannels(app.colors.secondary)};}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <style dangerouslySetInnerHTML={{ __html: brandingStyle }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <OrdersProvider>
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <footer className="mt-16 border-t border-secondary bg-white py-6 text-center text-xs text-neutral-400">
            © {new Date().getFullYear()} {app.name}. Sistema de acompanhamento de pedidos.
          </footer>
        </OrdersProvider>
      </body>
    </html>
  );
}
