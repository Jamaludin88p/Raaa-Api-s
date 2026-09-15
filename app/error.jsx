'use client'

import Link from 'next/link'

export default function ErrorPage({ error, reset }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', textAlign: 'center' }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '2.5rem 2rem', maxWidth: '440px', width: '100%', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ fontSize: '4.5rem', fontWeight: 900, color: '#ef4444', lineHeight: 1, marginBottom: '0.5rem', fontFamily: 'JetBrains Mono, monospace' }}>
          500
        </div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Internal Server Error
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          {error?.message || 'Terjadi kesalahan sistem saat memuat halaman ini.'}
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={() => reset()}
            style={{
              background: 'var(--text-primary)',
              color: 'var(--bg)',
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
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--primary)',
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
  )
}
