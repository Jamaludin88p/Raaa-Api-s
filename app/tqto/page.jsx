'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import settings from '../../src/config/setting.js'

export default function TqtoPage() {
  const [rotateMap, setRotateMap] = useState({})

  const handleMouseMove = (index, e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    setRotateMap(prev => ({
      ...prev,
      [index]: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }))
  }

  const handleMouseLeave = (index) => {
    setRotateMap(prev => ({
      ...prev,
      [index]: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }))
  }

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="container" style={{ marginTop: '2.5rem', marginBottom: '4rem' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>
            Thanks To (TQTO) & Community
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            Apresiasi, saluran WhatsApp resmi, dan kontak pengembang Kyzz APIs v2 (<code>api.kyzzz.xyz</code>).
          </p>
        </div>

        {/* 3D Tilt Profile Card dengan Foto Profile GitHub */}
        <div style={{ maxWidth: '650px', margin: '0 auto 3rem' }}>
          {settings.tqto?.map((item, idx) => (
            <div
              key={idx}
              onMouseMove={(e) => handleMouseMove(idx, e)}
              onMouseLeave={() => handleMouseLeave(idx)}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '2.25rem 1.75rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-md)',
                transform: rotateMap[idx] || 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                transition: 'transform 0.1s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <div style={{ width: '110px', height: '110px', margin: '0 auto 1.25rem', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--primary)', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)' }}>
                <img
                  src="https://github.com/Rynnstecu.png"
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {item.name}
              </h2>

              <div style={{
                display: 'inline-block',
                background: '#eff6ff',
                color: '#2563eb',
                fontWeight: 700,
                fontSize: '0.75rem',
                padding: '4px 12px',
                borderRadius: '20px',
                marginBottom: '1rem',
                border: '1px solid #bfdbfe'
              }}>
                {item.role}
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                {item.desc}
              </p>

              {/* Developer Contacts dengan SVG Module */}
              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <span>Direct Contacts</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
                  <a href={settings.contacts.tele1} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px', borderRadius: '6px', background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', fontSize: '0.775rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.28c-.15.66-.54.82-1.09.51l-3.01-2.22-1.45 1.4c-.16.16-.3.3-.61.3l.21-3.05 5.56-5.02c.24-.22-.05-.34-.37-.13l-6.87 4.32-2.96-.92c-.64-.2-.65-.64.13-.95l11.57-4.46c.54-.2 1.01.13.86.94z"/></svg>
                    Tele 1: @kyuugaperawan
                  </a>
                  <a href={settings.contacts.tele2} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px', borderRadius: '6px', background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', fontSize: '0.775rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.28c-.15.66-.54.82-1.09.51l-3.01-2.22-1.45 1.4c-.16.16-.3.3-.61.3l.21-3.05 5.56-5.02c.24-.22-.05-.34-.37-.13l-6.87 4.32-2.96-.92c-.64-.2-.65-.64.13-.95l11.57-4.46c.54-.2 1.01.13.86.94z"/></svg>
                    Tele 2: @kyunotdev
                  </a>
                  <a href={settings.contacts.tele3} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px', borderRadius: '6px', background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', fontSize: '0.775rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.28c-.15.66-.54.82-1.09.51l-3.01-2.22-1.45 1.4c-.16.16-.3.3-.61.3l.21-3.05 5.56-5.02c.24-.22-.05-.34-.37-.13l-6.87 4.32-2.96-.92c-.64-.2-.65-.64.13-.95l11.57-4.46c.54-.2 1.01.13.86.94z"/></svg>
                    Tele 3: @raramasihkyu
                  </a>
                  <a href={settings.contacts.wa} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px', borderRadius: '6px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontSize: '0.775rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                    WA: +62 831-5085-0721
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Channels Section */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
              <span>Official WhatsApp Channels</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '4px' }}>
              Bergabunglah dengan saluran komunikasi resmi kami untuk pembaruan fitur & dukungan.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {/* Channel Utama */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', marginBottom: '4px' }}>Saluran Utama</div>
              <h4 style={{ margin: '0 0 10px', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>Kyzz Official CH 1</h4>
              <a
                href={settings.channels.main}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: '#16a34a',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                Join Channel 1 &rarr;
              </a>
            </div>

            {/* Channel Kedua */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', marginBottom: '4px' }}>Saluran Kedua</div>
              <h4 style={{ margin: '0 0 10px', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>Kyzz Backup CH 2</h4>
              <a
                href={settings.channels.second}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: '#16a34a',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                Join Channel 2 &rarr;
              </a>
            </div>

            {/* Channel Ketiga */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase', marginBottom: '4px' }}>Saluran Ketiga</div>
              <h4 style={{ margin: '0 0 10px', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>Kyzz Support CH 3</h4>
              <a
                href={settings.channels.third}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: '#16a34a',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                Join Channel 3 &rarr;
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
