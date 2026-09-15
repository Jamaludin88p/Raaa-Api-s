import Link from 'next/link'
import settings from '../src/config/setting.js'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border-color)', padding: '1.75rem 0' }}>
      <div className="container">
        <div className="footer-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          {/* Sisi Kiri: Brand & Info */}
          <div>
            <div className="footer-brand" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Kyzz<span style={{ color: 'var(--primary)' }}> APIs v2</span>
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
              Developer-first REST API Platform built with Next.js & Hono.
            </p>
          </div>

          {/* Sisi Kanan: Links */}
          <ul className="footer-links" style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center', flexWrap: 'wrap' }}>
            <li>
              <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>Home</Link>
            </li>
            <li>
              <Link href="/docs" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>API Docs</Link>
            </li>
            <li>
              <a href="/openapi.json" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
                OpenAPI Spec
              </a>
            </li>
            <li>
              <a href={settings.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
                GitHub
              </a>
            </li>
            <li>
              <a href={settings.supportUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
                Support
              </a>
            </li>
            <li>
              <Link href="/tqto" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>TQTO</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
