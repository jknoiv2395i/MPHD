import React from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

const textAnimationVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

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
        <motion.div
          className="services-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 className="services-title" variants={textAnimationVariants}>
            Our Services
          </motion.h2>
          <motion.p className="services-subtitle" variants={textAnimationVariants}>
            We deliver thoughtful design and reliable execution across every project phase.
          </motion.p>
        </motion.div>

        <motion.div
          className="services-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants}
        >
          {services.map((s, idx) => (
            <motion.article
              key={s.title}
              className="service-card group"
              variants={cardVariants}
              whileHover={{ translateY: -6 }}
              transition={{ type: 'spring', stiffness: 350, damping: 24 }}
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
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
