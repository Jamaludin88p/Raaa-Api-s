'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'Apakah Kyzz APIs v2 gratis digunakan?',
    answer: 'Ya, seluruh REST API services di Kyzz APIs v2 dapat diakses dan digunakan secara gratis dengan menggunakan API Key publik resmi (`kyuzx`).'
  },
  {
    question: 'Bagaimana cara menggunakan API Key?',
    answer: 'Anda cukup menambahkan parameter query `?apikey=kyuzx` pada setiap request URL endpoint (contoh: `/api/stats?apikey=kyuzx`) atau menyertakannya pada header HTTP `x-api-key`.'
  },
  {
    question: 'Berapa batas rate limit request yang diperbolehkan?',
    answer: 'Secara default, rate limiter mengizinkan hingga 100 request / 15 menit per alamat IP untuk menjaga stabilitas server.'
  },
  {
    question: 'Apakah respon gambar didukung langsung?',
    answer: 'Ya! Endpoint seperti `/api/random/cosplay` mengembalikan stream binary gambar (`image/jpeg`) secara langsung yang dapat langsung ditampilkan di tag <img> HTML.'
  },
  {
    question: 'Bagaimana cara mendapatkan bantuan atau laporan bug?',
    answer: 'Anda dapat bergabung dengan WhatsApp Support Channel resmi kami melalui link Support yang tersedia di menu navigasi atau footer.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faq-section" style={{ padding: '4rem 0', background: 'var(--surface)', borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Pertanyaan yang sering ditanyakan seputar penggunaan Kyzz APIs v2.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  background: 'var(--bg)',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  style={{
                    width: '100%',
                    padding: '1.1rem 1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                >
                  <span>{faq.question}</span>
                  <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 1.25rem 1.1rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
