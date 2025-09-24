import React from 'react';

export default function FigmaNavbar() {
  return (
    <header
      data-loc="src/components/ui/figma-navbar.tsx:101:5"
      className="figma-navbar"
      style={{
        color: 'rgb(255, 255, 255)',
        fontWeight: 400,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        data-loc="src/components/ui/figma-navbar.tsx:107:7"
        className="figma-navbar-inner"
        style={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 400,
          height: 64,
          justifyContent: 'space-between',
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <div
          data-loc="src/components/ui/figma-navbar.tsx:109:9"
          className="figma-navbar-left"
          style={{ display: 'flex', alignItems: 'center', fontWeight: 400 }}
        >
          <button
            aria-label="Choose property type"
            data-loc="src/components/ui/figma-navbar.tsx:110:11"
            className="navbar-logo-button"
            style={{
              display: 'block',
              background: 'transparent',
              border: 'none',
              padding: 0,
            }}
          >
            <img
              alt="MPHD Group - Real Estate Consultants Nagpur Logo"
              data-loc="src/components/ui/figma-navbar.tsx:115:13"
              className="navbar-logo"
              src="https://cdn.builder.io/api/v1/image/assets%2Fe8d1f6446c8d4337adc2ecc52e9ca401%2F818d35f2f02e4bd0a6a439e55a89fd6a?format=webp&width=800"
              style={{ display: 'block', height: 48, marginRight: 'auto' }}
            />
          </button>
        </div>

        <nav
          data-loc="src/components/ui/figma-navbar.tsx:124:9"
          className="figma-navbar-nav"
          style={{ display: 'flex', alignItems: 'center', fontWeight: 400, marginLeft: 'auto' }}
        >
          <div data-loc="src/components/ui/figma-navbar.tsx:126:13" style={{ position: 'relative', marginLeft: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', height: 32, minWidth: 'fit-content' }}>
              <a
                href="/"
                style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontWeight: 400, paddingBottom: 8, paddingTop: 0, textDecoration: 'none' }}
              >
                Home
              </a>
            </div>
          </div>

          <div style={{ position: 'relative', marginLeft: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', height: 32, minWidth: 'fit-content' }}>
              <a
                href="/residential"
                style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontWeight: 400, paddingBottom: 8, textDecoration: 'none' }}
              >
                Residential
              </a>

              <button
                data-loc="src/components/ui/figma-navbar.tsx:138:19"
                aria-hidden
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'rgba(255,255,255,0.8)',
                  background: 'transparent',
                  border: 'none',
                  marginLeft: 4,
                  height: 24,
                  padding: 0,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', height: 16, overflow: 'hidden', stroke: 'rgba(255,255,255,0.8)' }}>
                  <path d="m6 9 6 6 6-6" style={{ stroke: 'rgba(255,255,255,0.8)' }} />
                </svg>
              </button>
            </div>
          </div>

          <div style={{ position: 'relative', marginLeft: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', height: 32, minWidth: 'fit-content' }}>
              <a href="/commercial" style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontWeight: 400, paddingBottom: 8, textDecoration: 'none' }}>Commercial</a>

              <button aria-hidden style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.8)', background: 'transparent', border: 'none', marginLeft: 4, height: 24, padding: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', height: 16, stroke: 'rgba(255,255,255,0.8)' }}>
                  <path d="m6 9 6 6 6-6" style={{ stroke: 'rgba(255,255,255,0.8)' }} />
                </svg>
              </button>
            </div>
          </div>

          <div style={{ position: 'relative', marginLeft: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', height: 32, minWidth: 'fit-content' }}>
              <a href="/industrial" style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontWeight: 400, paddingBottom: 8, textDecoration: 'none' }}>Industrial</a>
            </div>
          </div>

          <div style={{ position: 'relative', marginLeft: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', height: 32, minWidth: 'fit-content' }}>
              <a href="/services" style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontWeight: 400, paddingBottom: 8, textDecoration: 'none' }}>Contact us</a>
            </div>
          </div>

          <div style={{ position: 'relative', marginLeft: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', height: 32, minWidth: 'fit-content' }}>
              <a href="/about" style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontWeight: 400, paddingBottom: 8, textDecoration: 'none' }}>About</a>

              <button aria-hidden style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.8)', background: 'transparent', border: 'none', marginLeft: 4, height: 24, padding: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', height: 16, stroke: 'rgba(255,255,255,0.8)' }}>
                  <path d="m6 9 6 6 6-6" style={{ stroke: 'rgba(255,255,255,0.8)' }} />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        <div data-loc="src/components/ui/figma-navbar.tsx:267:9" style={{ display: 'flex', alignItems: 'center', fontWeight: 400 }}>
          <a href="/services" style={{ display: 'block', backgroundColor: 'rgb(255, 255, 255)', borderRadius: 9999, color: 'rgb(0, 0, 0)', fontWeight: 500, padding: '8px 24px', textDecoration: 'none' }}>Contact us</a>
        </div>

        <div data-loc="src/components/ui/figma-navbar.tsx:277:9" style={{ display: 'none', fontWeight: 400 }}>
          <button aria-label="Toggle mobile menu" data-loc="src/components/ui/figma-navbar.tsx:278:11" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', fontWeight: 400, height: 32, justifyContent: 'center', position: 'relative', background: 'transparent', border: 'none' }}>
            <span style={{ display: 'block', backgroundColor: 'rgb(255, 255, 255)', borderRadius: 9999, height: 2, width: 24 }}></span>
            <span style={{ display: 'block', backgroundColor: 'rgb(255, 255, 255)', borderRadius: 9999, height: 2, width: 24, margin: '4px 0' }}></span>
            <span style={{ display: 'block', backgroundColor: 'rgb(255, 255, 255)', borderRadius: 9999, height: 2, width: 24 }}></span>
          </button>
        </div>
      </div>
    </header>
  );
}
