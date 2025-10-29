import React from 'react'

export default function ServicesSection(){
  const services = [
    {
      title: 'Design & Architecture',
      desc: 'Human-centered design that balances aesthetics and functionality for every project.'
    },
    {
      title: 'Project Management',
      desc: 'End-to-end delivery with timelines, quality control and stakeholder alignment.'
    },
    {
      title: 'Consultation & Finance',
      desc: 'Advisory services to help plan budgets, timelines and legal requirements.'
    }
  ]

  return (
    <section className="services-section" aria-label="Our Services">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">
            Our Services
          </h2>
          <p className="services-subtitle">
            We deliver thoughtful design and reliable execution across every project phase.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, idx) => (
            <article
              key={s.title}
              className="service-card group"
            >
              <div className="service-card-inner">
                <div className="service-icon" aria-hidden>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L20 8V16L12 22L4 16V8L12 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>

                <a className="service-cta" href="#" aria-label={`Learn more about ${s.title}`}>
                  <span>Learn more</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
