export default function CodePreview() {
  return (
    <section className="code-preview">
      <div className="container">
        <div className="code-box reveal">
          <div className="code-header">
            <div className="code-dots">
              <div className="code-dot red"></div>
              <div className="code-dot yellow"></div>
              <div className="code-dot green"></div>
            </div>
            <div className="code-title">GET /api/stats</div>
          </div>
          
          <div className="code-body" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.875rem', lineHeight: '1.6' }}>
            <div style={{ color: '#64748b', marginBottom: '4px' }}>// Quick request example</div>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ color: '#38bdf8', fontWeight: 600 }}>curl</span> -X GET <span style={{ color: '#e2e8f0' }}>"https://api.kyzzz.xyz/api/stats?apikey=kyuzx"</span>
            </div>

            <div style={{ color: '#64748b', marginBottom: '4px' }}>// Response 200 OK</div>
            <pre style={{ margin: 0, padding: '12px 14px', background: '#020617', borderRadius: '8px', border: '1px solid #1e293b', color: '#f8fafc', overflowX: 'auto' }}>
{`{
    "creator": "Mommy Kyuu",
    "status": "online",
    "system": {
        "platform": "linux",
        "arch": "x64",
        "uptime": "12h 45m"
    },
    "cpu": {
        "cores": 8,
        "model": "ARMv8 Processor"
    },
    "memory": {
        "used": "120 MB",
        "total": "8192 MB"
    }
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
