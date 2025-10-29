import React from 'react'

export default function HeroSection() {
  return (
    <main
      className="hero-section"
      aria-label="Hero"
    >
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Unlocking doors to luxury living
          </h1>

          <p className="hero-subtitle">
            Bringing families closer to their dream addresses.
          </p>

          <a
            href="#"
            className="get-started-button"
            role="button"
          >
            <span>Get started</span>
            <div className="button-icon" aria-hidden>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.70508 7H11.4551M11.4551 7L7.08008 2.625M11.4551 7L7.08008 11.375" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>
        </div>
      </div>

      <div className="hero-gradient" aria-hidden />
    </main>
  )
}
