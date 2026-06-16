import Link from 'next/link';
import { app } from '@/config/app';

export default function Header() {
  return (
    <header className="border-b border-secondary bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          {app.logoImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={app.logoImage} alt={app.name} className="h-9 w-auto" />
          ) : (
            <span className="flex items-center gap-2 text-xl font-bold tracking-tight text-primary">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                <path d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" />
              </svg>
              {app.name}
            </span>
          )}
        </Link>

        <Link
          href="/admin"
          className="text-sm font-medium text-neutral-500 transition hover:text-primary"
        >
          Área administrativa
        </Link>
      </div>
    </header>
  );
}
