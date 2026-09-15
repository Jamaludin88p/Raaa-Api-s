import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', textAlign: 'center' }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '2.5rem 2rem', maxWidth: '440px', width: '100%', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ fontSize: '4.5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1, marginBottom: '0.5rem', fontFamily: 'JetBrains Mono, monospace' }}>
          404
        </div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Page Not Found
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.75rem', lineHeight: '1.6' }}>
          Halaman atau endpoint yang Anda cari tidak ditemukan atau telah dipindahkan.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--primary)',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.875rem',
            padding: '0.65rem 1.5rem',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          &larr; Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}
