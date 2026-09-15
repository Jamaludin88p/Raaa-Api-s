'use client'

import Link from 'next/link'

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body style={{ margin: 0, fontFamily: "'Inter', sans-serif" }}>
        <div style={{ minHeight: '100vh', background: 'var(--bg, #f8fafc)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2.5rem 2rem', maxWidth: '440px', width: '100%', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '4.5rem', fontWeight: 900, color: '#ef4444', lineHeight: 1, marginBottom: '0.5rem', fontFamily: 'JetBrains Mono, monospace' }}>
              500
            </div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Internal Server Error
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {error?.message || 'Terjadi kesalahan internal server saat memproses permintaan Anda.'}
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              {reset && (
                <button
                  onClick={() => reset()}
                  style={{
                    background: '#0f172a',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  🔄 Coba Lagi
                </button>
              )}
              <Link
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#2563eb',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  textDecoration: 'none'
                }}
              >
                &larr; Beranda
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
