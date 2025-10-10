import React from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.12 } }
}

const itemUp = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } }
}

const heroBg = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.6, ease: 'easeOut', delay: 0.2 } }
}

export default function HeroSection() {
  return (
    <motion.main
      className="hero-section"
      initial="hidden"
      animate="visible"
      variants={heroBg}
      aria-label="Hero"
    >
      <div className="hero-container">
        <motion.div className="hero-content" variants={containerVariants}>
          <motion.h1 className="hero-title" variants={itemUp}>
            Unlocking doors to luxury living
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemUp}>
            Bringing families closer to their dream addresses.
          </motion.p>

          <motion.a
            href="#"
            className="get-started-button"
            role="button"
            variants={itemUp}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            <span>Get started</span>
            <div className="button-icon" aria-hidden>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.70508 7H11.4551M11.4551 7L7.08008 2.625M11.4551 7L7.08008 11.375" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.a>
        </motion.div>
      </div>

      <div className="hero-gradient" aria-hidden />
    </motion.main>
  )
}
