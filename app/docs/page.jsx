'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function DocsPage() {
  const [spec, setSpec] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedEndpoints, setExpandedEndpoints] = useState({})
  const [inputState, setInputState] = useState({})
  const [bodyState, setBodyState] = useState({})
  const [executingState, setExecutingState] = useState({})
  const [responseState, setResponseState] = useState({})
  const [globalApiKey, setGlobalApiKey] = useState('kyuzx')
  const [selectedTag, setSelectedTag] = useState('ALL')
  const [copiedState, setCopiedState] = useState({})

  useEffect(() => {
    const savedKey = localStorage.getItem('kyzz_global_apikey')
    if (savedKey) {
      setGlobalApiKey(savedKey)
    }
  }, [])

  const handleGlobalApiKeyChange = (val) => {
    setGlobalApiKey(val)
    localStorage.setItem('kyzz_global_apikey', val)
  }

  useEffect(() => {
    async function fetchSpec() {
      try {
        const res = await fetch('/openapi.json')
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`)
        const data = await res.json()
        setSpec(data)
        
        // Auto-expand default categories
        if (data.paths) {
          const catMap = {}
          Object.entries(data.paths).forEach(([_, methods]) => {
            Object.entries(methods).forEach(([_, details]) => {
              const category = (details.tags && details.tags[0]) || 'General'
              catMap[category] = true
            })
          })
          setExpandedCategories(catMap)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchSpec()
  }, [])

  const toggleCategory = (catName) => {
    setExpandedCategories(prev => ({ ...prev, [catName]: !prev[catName] }))
  }

  const toggleEndpoint = (key) => {
    setExpandedEndpoints(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleInputChange = (endpointKey, paramName, value) => {
    setInputState(prev => ({
      ...prev,
      [endpointKey]: {
        ...(prev[endpointKey] || {}),
        [paramName]: value
      }
    }))
  }

  const handleBodyChange = (endpointKey, value) => {
    setBodyState(prev => ({ ...prev, [endpointKey]: value }))
  }

  const copyText = (key, text) => {
    navigator.clipboard.writeText(text)
    setCopiedState(prev => ({ ...prev, [key]: true }))
    setTimeout(() => {
      setCopiedState(prev => ({ ...prev, [key]: false }))
    }, 2000)
  }

  const executeEndpoint = async (endpointKey, path, method, status) => {
    setExecutingState(prev => ({ ...prev, [endpointKey]: true }))

    if (status === 'OFFLINE') {
      setResponseState(prev => ({
        ...prev,
        [endpointKey]: {
          url: path,
          method: method.toUpperCase(),
          status: 503,
          data: {
            error: 'Service Unavailable',
            message: 'This endpoint is currently OFFLINE.',
            status: 503
          }
        }
      }))
      setExecutingState(prev => ({ ...prev, [endpointKey]: false }))
      return
    }

    let fullPath = path
    const paramsObj = inputState[endpointKey] || {}
    const queryParams = new URLSearchParams()

    // Automatic global API Key fallback if apikey is required
    let hasApiKey = false
    for (const [key, value] of Object.entries(paramsObj)) {
      if (key === 'apikey' && value) hasApiKey = true
      if (value) {
        if (fullPath.includes(`{${key}}`)) {
          fullPath = fullPath.replace(`{${key}}`, encodeURIComponent(value))
        } else {
          queryParams.append(key, value)
        }
      }
    }

    if (!hasApiKey && globalApiKey) {
      queryParams.append('apikey', globalApiKey)
    }

    if (queryParams.toString()) {
      fullPath += (fullPath.includes('?') ? '&' : '?') + queryParams.toString()
    }

    const options = {
      method: method.toUpperCase(),
      headers: { 'Content-Type': 'application/json' }
    }

    const jsonBody = bodyState[endpointKey]
    if (jsonBody) {
      try {
        options.body = JSON.stringify(JSON.parse(jsonBody))
      } catch (e) {
        alert('Invalid JSON Body!')
        setExecutingState(prev => ({ ...prev, [endpointKey]: false }))
        return
      }
    }

    const tStart = performance.now()
    try {
      const res = await fetch(fullPath, options)
      const tEnd = performance.now()
      const latency = (tEnd - tStart).toFixed(0)
      const contentType = res.headers.get('content-type') || ''
      let resultData
      let isImage = false

      if (contentType.includes('image/')) {
        const blob = await res.blob()
        resultData = URL.createObjectURL(blob)
        isImage = true
      } else if (contentType.includes('application/json')) {
        resultData = await res.json()
      } else {
        resultData = await res.text()
      }

      setResponseState(prev => ({
        ...prev,
        [endpointKey]: {
          url: fullPath,
          method: method.toUpperCase(),
          status: res.status,
          contentType,
          isImage,
          latency,
          data: resultData
        }
      }))
    } catch (err) {
      const tEnd = performance.now()
      const latency = (tEnd - tStart).toFixed(0)
      setResponseState(prev => ({
        ...prev,
        [endpointKey]: {
          url: fullPath,
          method: method.toUpperCase(),
          status: 500,
          isImage: false,
          latency,
          data: `// Error: ${err.message}`
        }
      }))
    } finally {
      setExecutingState(prev => ({ ...prev, [endpointKey]: false }))
    }
  }

  const getMethodBadgeClass = (method) => {
    switch (method.toLowerCase()) {
      case 'get': return 'method-get'
      case 'post': return 'method-post'
      case 'put': return 'method-put'
      case 'delete': return 'method-delete'
      default: return ''
    }
  }

  // Group endpoints by category / tags
  const getGroupedEndpoints = () => {
    if (!spec?.paths) return {}
    const grouped = {}

    Object.entries(spec.paths).forEach(([path, methods]) => {
      Object.entries(methods).forEach(([method, details]) => {
        const category = (details.tags && details.tags[0]) || 'General'
        if (!grouped[category]) {
          grouped[category] = []
        }
        grouped[category].push({ path, method, details })
      })
    })

    return grouped
  }

  const groupedEndpoints = getGroupedEndpoints()

  return (
    <div className="page-wrapper docs-wrapper">
      <Navbar />

      <div className="container" style={{ marginTop: '1rem' }}>
        {/* Info Card Header */}
        <div className="info-card" style={{ padding: '1.5rem', marginBottom: '1.25rem', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid var(--border-color)', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>API Documentation</h1>
                <p style={{ color: 'var(--text-secondary)', margin: '0.2rem 0 0', fontSize: '0.875rem', fontWeight: 500 }}>
                  High-performance, developer-first REST API platform maintained by <strong style={{ color: 'var(--text-primary)' }}>Mommy Kyuu</strong>.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="badge badge-online" style={{ fontSize: '0.75rem', padding: '4px 10px', fontWeight: 700 }}>OAS 3.0.0</span>
              <span className="badge" style={{ fontSize: '0.75rem', padding: '4px 10px', background: '#eff6ff', color: '#2563eb', borderColor: '#bfdbfe', fontWeight: 700 }}>v2.0.0</span>
            </div>
          </div>

          {/* Video Loop Muted Showcase */}
          <div style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'center', background: '#020617', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <video
              src="/docs.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                maxHeight: '320px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* Playground Controls: Global API Key & Category Filter */}
        <div style={{ margin: '0.75rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Global API Key Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--surface)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
              <span>Global API Key:</span>
            </span>
            <input
              type="text"
              value={globalApiKey}
              onChange={(e) => handleGlobalApiKeyChange(e.target.value)}
              placeholder="e.g. kyuzx"
              style={{
                flex: 1,
                padding: '4px 8px',
                fontSize: '0.8rem',
                borderRadius: '4px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                fontFamily: 'JetBrains Mono, monospace'
              }}
            />
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search endpoints or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            style={{ width: '100%', padding: '8px 12px', fontSize: '0.85rem' }}
          />

          {/* Quick Tag Category Filters */}
          {Object.keys(groupedEndpoints).length > 0 && (
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
              <button
                onClick={() => setSelectedTag('ALL')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '20px',
                  border: selectedTag === 'ALL' ? '1px solid #2563eb' : '1px solid var(--border-color)',
                  background: selectedTag === 'ALL' ? '#eff6ff' : 'var(--surface)',
                  color: selectedTag === 'ALL' ? '#2563eb' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                All Categories ({Object.values(groupedEndpoints).reduce((a, b) => a + b.length, 0)})
              </button>
              {Object.keys(groupedEndpoints).map(catName => (
                <button
                  key={catName}
                  onClick={() => setSelectedTag(catName)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    border: selectedTag === catName ? '1px solid #2563eb' : '1px solid var(--border-color)',
                    background: selectedTag === catName ? '#eff6ff' : 'var(--surface)',
                    color: selectedTag === catName ? '#2563eb' : 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {catName} ({groupedEndpoints[catName].length})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="info-card" style={{ textAlign: 'center', color: '#64748b', padding: '3rem 1rem' }}>
            Loading API specifications...
          </div>
        )}

        {error && (
          <div className="info-card" style={{ color: '#dc2626', background: '#fef2f2', borderColor: '#fecdd3', padding: '1.5rem' }}>
            <strong>Error loading OpenAPI spec:</strong> {error}
          </div>
        )}

        {/* Grouped Endpoints Categories */}
        {Object.keys(groupedEndpoints).length > 0 && (
          <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {Object.entries(groupedEndpoints).map(([catName, endpoints]) => {
              if (selectedTag !== 'ALL' && selectedTag !== catName) return null

              const isCategoryOpen = !!expandedCategories[catName]
              const filteredItems = endpoints.filter(({ path, method, details }) => {
                const searchTarget = `${method} ${path} ${details.summary || details.description || path}`.toLowerCase()
                return !searchQuery || searchTarget.includes(searchQuery.toLowerCase())
              })

              if (filteredItems.length === 0) return null

              return (
                <div 
                  key={catName} 
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {/* Category Card Header */}
                  <div 
                    onClick={() => toggleCategory(catName)}
                    style={{
                      padding: '0.75rem 1rem',
                      background: 'var(--surface-hover)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      userSelect: 'none',
                      borderBottom: isCategoryOpen ? '1px solid var(--border-color)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif" }}>{catName}</span>
                      <span className="badge" style={{ fontSize: '0.7rem', padding: '1px 6px', background: '#e2e8f0', color: '#475569' }}>
                        {filteredItems.length} {filteredItems.length === 1 ? 'endpoint' : 'endpoints'}
                      </span>
                    </div>
                    <span style={{ transform: isCategoryOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      ▼
                    </span>
                  </div>

                  {/* Category Endpoints List */}
                  {isCategoryOpen && (
                    <div style={{ padding: '0.6rem' }}>
                      {filteredItems.map(({ path, method, details }) => {
                        const endpointKey = `${method}-${path}`
                        const isExpanded = !!expandedEndpoints[endpointKey]
                        const isExecuting = !!executingState[endpointKey]
                        const response = responseState[endpointKey]
                        const isCopied = !!copiedState[endpointKey]
                        const status = details['x-status'] || 'ONLINE'
                        const isOnline = status === 'ONLINE'
                        const displayName = details.summary || details.description || 'Endpoint'

                        const responseText = response
                          ? (typeof response.data === 'object' ? JSON.stringify(response.data, null, 2) : response.data)
                          : ''

                        return (
                          <div key={endpointKey} className="op-block" style={{ marginBottom: '0.5rem', borderRadius: '6px' }}>
                            {/* Compact Endpoint Row Header */}
                            <div className="op-sum" onClick={() => toggleEndpoint(endpointKey)} style={{ padding: '0.65rem 0.85rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', flex: 1 }}>
                                  <span className={`method ${getMethodBadgeClass(method)}`} style={{ padding: '2px 6px', fontSize: '0.7rem' }}>{method}</span>
                                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayName}</span>
                                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>({path})</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                  <span className={`badge ${isOnline ? 'badge-online' : 'badge-offline'}`} style={{ fontSize: '0.7rem', padding: '1px 6px' }}>{status}</span>
                                  <span className={`op-arrow ${isExpanded ? 'open' : ''}`} style={{ fontSize: '0.7rem' }}>▼</span>
                                </div>
                              </div>
                            </div>

                            {/* Expandable Details */}
                            {isExpanded && (
                              <div className="op-content">
                                <p className="op-desc">
                                  {details.description || details.summary || 'No description provided.'}
                                </p>

                                {/* Parameters */}
                                {details.parameters && details.parameters.length > 0 && (
                                  <div style={{ marginBottom: '1.25rem' }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Parameters</div>
                                    <div className="params-grid">
                                      {details.parameters.map((p) => (
                                        <div key={p.name} className="param-group">
                                          <label>{p.name}{p.required ? ' *' : ''} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>({p.in})</span></label>
                                          <input
                                            type="text"
                                            placeholder={p.name}
                                            value={inputState[endpointKey]?.[p.name] || ''}
                                            onChange={(e) => handleInputChange(endpointKey, p.name, e.target.value)}
                                            className="param-input"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Request Body */}
                                {details.requestBody && (
                                  <div style={{ marginBottom: '1.25rem' }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Request Body (JSON)</div>
                                    <textarea
                                      placeholder='{ "key": "value" }'
                                      value={bodyState[endpointKey] || ''}
                                      onChange={(e) => handleBodyChange(endpointKey, e.target.value)}
                                      className="body-input"
                                    />
                                  </div>
                                )}

                                {/* Execute Button */}
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                  <button
                                    onClick={() => executeEndpoint(endpointKey, path, method, status)}
                                    disabled={isExecuting}
                                    className="try-btn"
                                  >
                                    {isExecuting ? (
                                      <>
                                        <span className="spinner"></span>
                                        <span>Sending Request...</span>
                                      </>
                                    ) : (
                                      <>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                        </svg>
                                        <span>Execute Request</span>
                                      </>
                                    )}
                                  </button>
                                </div>

                                {/* Response Terminal */}
                                {response && (() => {
                                  const fullUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}${response.url}`
                                  const curlCmd = `curl -X ${response.method} "${fullUrl}"`
                                  const isUrlCopied = !!copiedState[`${endpointKey}-url`]
                                  const isCurlCopied = !!copiedState[`${endpointKey}-curl`]
                                  const isJsonCopied = !!copiedState[`${endpointKey}-json`]

                                  return (
                                    <div className="response-box" style={{ marginTop: '1rem', position: 'relative', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem', boxShadow: 'var(--shadow-sm)' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                                        <div className="res-header" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
                                          Response Status: 
                                          <span style={{
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            background: response.status >= 200 && response.status < 300 ? '#ecfdf5' : '#fef2f2',
                                            color: response.status >= 200 && response.status < 300 ? '#047857' : '#b91c1c',
                                            border: response.status >= 200 && response.status < 300 ? '1px solid #a7f3d0' : '1px solid #fecdd3',
                                            fontWeight: 700
                                          }}>
                                            {response.status}
                                          </span>
                                        </div>
                                        {response.latency && (
                                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                                            <span>{response.latency} ms</span>
                                          </span>
                                        )}
                                      </div>

                                      {/* Request Info & cURL commands */}
                                      <div style={{ marginBottom: '12px', background: '#f8fafc', padding: '10px 12px', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid #e2e8f0' }}>
                                        {/* Request URL */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                                          <span style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 600 }}>Request URL:</span>
                                          <button
                                            onClick={() => copyText(`${endpointKey}-url`, fullUrl)}
                                            style={{
                                              padding: '2px 8px',
                                              borderRadius: '4px',
                                              border: '1px solid #cbd5e1',
                                              background: '#ffffff',
                                              fontSize: '0.7rem',
                                              fontWeight: 600,
                                              cursor: 'pointer',
                                              color: isUrlCopied ? '#059669' : '#475569'
                                            }}
                                          >
                                            {isUrlCopied ? '✓ Copied URL' : 'Copy URL'}
                                          </button>
                                        </div>
                                        <code style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', padding: '6px 8px', borderRadius: '4px', display: 'block', wordBreak: 'break-all', fontFamily: 'JetBrains Mono, monospace', marginBottom: '10px', fontSize: '0.775rem' }}>
                                          <a href={response.url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>
                                            {fullUrl}
                                          </a>
                                        </code>

                                        {/* cURL Command */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                                          <span style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 600 }}>cURL Command:</span>
                                          <button
                                            onClick={() => copyText(`${endpointKey}-curl`, curlCmd)}
                                            style={{
                                              padding: '2px 8px',
                                              borderRadius: '4px',
                                              border: '1px solid #cbd5e1',
                                              background: '#ffffff',
                                              fontSize: '0.7rem',
                                              fontWeight: 600,
                                              cursor: 'pointer',
                                              color: isCurlCopied ? '#059669' : '#475569'
                                            }}
                                          >
                                            {isCurlCopied ? '✓ Copied cURL' : 'Copy cURL'}
                                          </button>
                                        </div>
                                        <code style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', padding: '6px 8px', borderRadius: '4px', display: 'block', wordBreak: 'break-all', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.775rem' }}>
                                          {curlCmd}
                                        </code>
                                      </div>

                                      {/* Copy JSON Button */}
                                      {!response.isImage && (
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '6px' }}>
                                          <button
                                            onClick={() => copyText(`${endpointKey}-json`, responseText)}
                                            style={{
                                              padding: '3px 10px',
                                              borderRadius: '4px',
                                              border: '1px solid #cbd5e1',
                                              background: '#f8fafc',
                                              fontSize: '0.75rem',
                                              fontWeight: 600,
                                              cursor: 'pointer',
                                              color: isJsonCopied ? '#059669' : '#0f172a'
                                            }}
                                          >
                                            {isJsonCopied ? '✓ Copied JSON' : 'Copy JSON'}
                                          </button>
                                        </div>
                                      )}

                                      {/* Render Image or White-Black Minimalist JSON Output */}
                                      {response.isImage ? (
                                        <div style={{ textAlign: 'center', padding: '0.75rem 0', width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                          <img 
                                            src={response.data} 
                                            alt="Endpoint Image Result" 
                                            style={{ 
                                              maxWidth: '100%', 
                                              height: 'auto', 
                                              maxHeight: '500px', 
                                              borderRadius: '8px', 
                                              objectFit: 'contain', 
                                              border: '1px solid #cbd5e1',
                                              display: 'block'
                                            }} 
                                          />
                                        </div>
                                      ) : (
                                        <pre style={{
                                          margin: 0,
                                          maxHeight: '260px',
                                          overflowY: 'auto',
                                          overflowX: 'auto',
                                          padding: '10px 12px',
                                          background: '#ffffff',
                                          color: '#0f172a',
                                          borderRadius: '6px',
                                          border: '1px solid #cbd5e1',
                                          fontSize: '0.8rem',
                                          lineHeight: '1.4',
                                          fontFamily: "'JetBrains Mono', monospace"
                                        }}>
                                          {responseText}
                                        </pre>
                                      )}
                                    </div>
                                  )
                                })()}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}


