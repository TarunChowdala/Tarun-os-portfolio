import { SITE, SOCIALS } from '@/data/site'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] px-6 py-10 pb-28">
      <div className="container-wide flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold">
            {SITE.product}
          </p>
          <p className="mt-1 text-xs text-[var(--color-subtle)]">
            © {new Date().getFullYear()} {SITE.name}. Built as a frontend foundation.
          </p>
        </div>
        <ul className="flex flex-wrap gap-4">
          {SOCIALS.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[var(--color-muted)] transition hover:text-[var(--color-fg)]"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
