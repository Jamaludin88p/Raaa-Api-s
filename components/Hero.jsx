import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-badge reveal">
          <span className="hero-badge-dot"></span>
          v2.0.0 • Official API: api.kyzzz.xyz
        </div>
        
        <h1 className="reveal delay-100">
          Build faster with simple & <span>reliable APIs</span>
        </h1>
        
        <p className="reveal delay-200">
          Developer-first RESTful services built with Next.js & Hono for speed, simplicity, and ease of integration. Explore interactive endpoints in seconds.
        </p>
        
        <div className="hero-cta reveal delay-300">
          <Link href="/docs" className="btn-primary">
            Get Started
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
          
          <Link href="/docs" className="btn-secondary">
            Explore Endpoints
          </Link>
        </div>
      </div>
    </section>
  )
}
