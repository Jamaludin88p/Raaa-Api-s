'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import settings from '../src/config/setting.js'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Handle ESC key press & prevent scroll when drawer is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu()
    }

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="brand" onClick={closeMenu}>
          Kyzz<span> APIs v2</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="nav-links desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', listStyle: 'none' }}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/docs">Docs</Link></li>
          <li><a href="/openapi.json" target="_blank" rel="noopener noreferrer">Spec</a></li>
          <li><a href={settings.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><Link href="/tqto">TQTO</Link></li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/docs" className="btn-get-started desktop-only">
            Get Started
          </Link>

          {/* Top Right Hamburger Button */}
          <button
            onClick={toggleMenu}
            className={`hamburger-btn ${isMenuOpen ? 'active' : ''}`}
            aria-label={isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="17" x2="20" y2="17"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Backdrop Overlay */}
      <div 
        className={`drawer-overlay ${isMenuOpen ? 'open' : ''}`} 
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Right-to-Left Sliding Drawer Panel */}
      <div className={`side-drawer ${isMenuOpen ? 'open' : ''}`} aria-hidden={!isMenuOpen}>
        <div className="side-drawer-header">
          <div className="side-drawer-brand">
            Kyzz<span> APIs v2</span>
          </div>
          <button onClick={closeMenu} className="close-btn" aria-label="Close Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="side-drawer-body">
          <ul className="side-drawer-links">
            <li>
              <Link href="/" onClick={closeMenu}>
                <span>Home</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Link>
            </li>
            <li>
              <Link href="/docs" onClick={closeMenu}>
                <span>API Documentation</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Link>
            </li>
            <li>
              <a href="/openapi.json" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                <span>OpenAPI Spec</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
            </li>
            <li>
              <a href={settings.github} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                <span>GitHub</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
            </li>
            <li>
              <a href={settings.supportUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                <span>Support</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
            </li>
            <li>
              <Link href="/tqto" onClick={closeMenu}>
                <span>TQTO / Credits</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

