'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

const LAUNCH_DATE = new Date('2026-04-03T00:00:00');

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    function calc() {
      const diff = target - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
}

function CountdownUnit({ value, label }) {
  const str = String(value).padStart(2, '0');
  return (
    <div className="cs-countdown-unit">
      <div className="cs-countdown-number">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={str}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="cs-countdown-digit"
          >
            {str}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="cs-countdown-label">{label}</span>
    </div>
  );
}

export default function ComingSoon() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const prefersReducedMotion = useReducedMotion();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  const marqueeItems = [
    'BRAND STRATEGY', 'CREATOR MARKETING', 'CONTENT PRODUCTION',
    'DIGITAL CAMPAIGNS', 'SOCIAL MEDIA', 'PERFORMANCE MARKETING',
    'BRAND STORYTELLING', 'INFLUENCER MARKETING',
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── PERFORMANCE: Promote layers to GPU upfront ── */
        .cs-root {
          min-height: 100vh;
          min-height: 100dvh;
          background: #0a0a0a;
          color: #ffffff;
          font-family: 'Montserrat', sans-serif;
          overflow-x: hidden;
          position: relative;
          /* Fix iOS momentum scroll lag */
          -webkit-overflow-scrolling: touch;
        }

        /* ── NOISE: use absolute (not fixed) — fixed causes scroll repaint on mobile ── */
        .cs-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
          /* Use will-change so browser composites this layer separately */
          will-change: transform;
        }

        /* ── GRID PATTERN ── */
        .cs-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* ── ORB: Use will-change + transform3d for GPU compositing ── */
        .cs-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          /* GPU layer promotion — avoids triggering layout/paint on animate */
          will-change: transform;
          transform: translateZ(0);
        }
        .cs-orb-1 {
          width: min(600px, 90vw);
          height: min(600px, 90vw);
          background: radial-gradient(circle, rgba(255,107,0,0.14) 0%, transparent 70%);
          top: -80px; right: -120px;
          /* No blur filter — radial-gradient achieves same look without GPU cost */
        }
        .cs-orb-2 {
          width: min(450px, 80vw);
          height: min(450px, 80vw);
          background: radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%);
          bottom: -80px; left: -80px;
        }
        .cs-orb-3 {
          width: min(280px, 60vw);
          height: min(280px, 60vw);
          background: radial-gradient(circle, rgba(255,140,0,0.1) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) translateZ(0);
        }

        /* ── HERO ── */
        .cs-hero {
          position: relative;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 1.25rem 5rem;
          overflow: hidden;
        }

        /* ── HERO CONTENT ── */
        .cs-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 860px;
          width: 100%;
        }

        /* ── DEV BADGE ── */
        .cs-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,107,0,0.08);
          border: 1px solid rgba(255,107,0,0.3);
          border-radius: 100px;
          padding: 7px 16px;
          margin-bottom: 2rem;
          /* Removed backdrop-filter: blur — causes scroll lag on mobile */
        }
        .cs-badge-dot {
          width: 7px; height: 7px;
          background: #FF6B00;
          border-radius: 50%;
          flex-shrink: 0;
          animation: badge-pulse 2s ease-in-out infinite;
        }
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,0,0.5); }
          50%       { box-shadow: 0 0 0 5px rgba(255,107,0,0); }
        }
        .cs-badge-text {
          font-size: clamp(0.6rem, 2.2vw, 0.72rem);
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #FF6B00;
        }

        /* ── HEADLINE ── */
        .cs-headline {
          font-size: clamp(2.6rem, 11vw, 7rem);
          font-weight: 900;
          line-height: 1.06;
          letter-spacing: -0.025em;
          font-family: 'Montserrat', sans-serif;
          margin-bottom: 1.25rem;
          overflow: visible;
        }
        .cs-headline-white { color: #ffffff; display: block; }
        .cs-headline-orange {
          display: block;
          background: linear-gradient(135deg, #FF6B00 0%, #ff8c38 50%, #ffb380 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cs-headline-dim {
          color: rgba(255,255,255,0.14);
          display: block;
        }

        /* ── SUBTEXT ── */
        .cs-sub {
          font-size: clamp(0.88rem, 2.5vw, 1.1rem);
          color: #7a7a7a;
          max-width: 540px;
          margin: 0 auto 2.5rem;
          line-height: 1.75;
          font-weight: 400;
          padding: 0 0.25rem;
        }

        /* ── TAGS ── */
        .cs-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          justify-content: center;
          margin-bottom: 2.25rem;
          padding: 0 0.5rem;
        }
        .cs-tag {
          font-size: clamp(0.55rem, 1.8vw, 0.62rem);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px;
          padding: 4px 12px;
        }

        /* ── PROGRESS BAR ── */
        .cs-progress-wrap { margin-bottom: 2.5rem; }
        .cs-progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.6rem;
          max-width: 460px;
          margin-left: auto;
          margin-right: auto;
        }
        .cs-progress-label {
          font-size: clamp(0.58rem, 1.8vw, 0.68rem);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #4a4a4a;
          font-weight: 600;
        }
        .cs-progress-pct { font-size: 0.82rem; font-weight: 700; color: #FF6B00; }
        .cs-progress-track {
          height: 3px;
          background: rgba(255,255,255,0.06);
          border-radius: 100px;
          overflow: hidden;
          width: 100%;
          max-width: 460px;
          margin: 0 auto;
        }
        .cs-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #FF6B00, #ffb380);
          border-radius: 100px;
          box-shadow: 0 0 10px rgba(255,107,0,0.45);
          /* Use transform for animation — never animate width on mobile */
          transform-origin: left;
        }

        /* ── COUNTDOWN ── */
        .cs-countdown {
          display: flex;
          align-items: center;
          justify-content: center;
          /* Fixed gap so items don't wrap on mobile */
          gap: clamp(0.5rem, 2.5vw, 2rem);
          margin-bottom: 2.5rem;
          flex-wrap: nowrap;
        }
        .cs-countdown-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .cs-countdown-number {
          position: relative;
          width: clamp(62px, 18vw, 100px);
          height: clamp(62px, 18vw, 100px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          overflow: hidden;
          /* No backdrop-filter — kills scroll performance on mobile (repainted every second) */
        }
        .cs-countdown-digit {
          font-size: clamp(1.5rem, 5.5vw, 2.8rem);
          font-weight: 800;
          color: #ffffff;
          font-variant-numeric: tabular-nums;
          display: block;
          font-family: 'Montserrat', sans-serif;
          /* Promote to own layer for AnimatePresence flips */
          will-change: transform, opacity;
        }
        .cs-countdown-label {
          font-size: clamp(0.5rem, 1.5vw, 0.58rem);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #4a4a4a;
          font-weight: 600;
        }
        .cs-countdown-sep {
          font-size: clamp(1.2rem, 4vw, 2rem);
          font-weight: 300;
          color: rgba(255,107,0,0.35);
          margin-top: -16px;
          flex-shrink: 0;
        }

        /* ── EMAIL FORM ── */
        .cs-form-wrap {
          width: 100%;
          max-width: 480px;
          margin: 0 auto 2rem;
          padding: 0 0.5rem;
        }
        .cs-form-label {
          font-size: clamp(0.58rem, 1.8vw, 0.68rem);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #4a4a4a;
          font-weight: 600;
          display: block;
          margin-bottom: 0.75rem;
        }
        /* Stack vertically on mobile, row on desktop */
        .cs-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        @media (min-width: 480px) {
          .cs-form { flex-direction: row; }
        }
        .cs-input {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          padding: 14px 20px;
          font-size: 1rem; /* ≥16px prevents iOS zoom-on-focus */
          color: #ffffff;
          font-family: 'Montserrat', sans-serif;
          /* Remove transition on box-shadow — causes input lag on mobile */
          transition: border-color 0.2s;
          outline: none;
          -webkit-appearance: none;
          appearance: none;
        }
        .cs-input::placeholder { color: #3a3a3a; }
        .cs-input:focus { border-color: #FF6B00; }
        .cs-btn {
          background: #FF6B00;
          color: #ffffff;
          border: none;
          border-radius: 100px;
          padding: 14px 28px;
          font-size: 0.92rem;
          font-weight: 700;
          font-family: 'Montserrat', sans-serif;
          cursor: pointer;
          white-space: nowrap;
          /* touch-action: manipulation disables 300ms tap delay */
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .cs-btn:hover  { background: #ff8533; }
        .cs-btn:active { background: #e05f00; }
        .cs-form-error {
          font-size: 0.75rem;
          color: #ff5555;
          margin-top: 0.5rem;
          text-align: center;
        }
        .cs-form-success {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 0.88rem;
          color: #FF6B00;
          font-weight: 600;
          padding: 14px 0;
          text-align: center;
        }
        .cs-form-success-icon {
          width: 24px; height: 24px;
          background: rgba(255,107,0,0.15);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.72rem;
          flex-shrink: 0;
        }

        /* ── SOCIAL ── */
        .cs-social {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        .cs-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #555;
          text-decoration: none;
          flex-shrink: 0;
          /* Faster tap feedback, no 300ms delay */
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .cs-social-link svg {
          width: 18px; height: 18px;
          fill: currentColor;
          display: block;
        }
        @media (hover: hover) {
          /* Hover effects only on devices with a real pointer — not mobile */
          .cs-social-link:hover {
            background: rgba(255,107,0,0.12);
            border-color: rgba(255,107,0,0.35);
            color: #FF6B00;
          }
          .cs-btn:hover { transform: translateY(-1px); box-shadow: 0 0 28px rgba(255,107,0,0.35); }
        }
        .cs-social-link:active { background: rgba(255,107,0,0.15); color: #FF6B00; }

        /* ── SCROLL HINT ── */
        .cs-scroll-hint {
          position: absolute;
          bottom: 1.75rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .cs-scroll-mouse {
          width: 22px; height: 34px;
          border: 2px solid rgba(255,255,255,0.12);
          border-radius: 11px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 4px;
        }
        .cs-scroll-dot {
          width: 3px; height: 3px;
          background: #FF6B00;
          border-radius: 50%;
          animation: scroll-bounce 2s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0);   opacity: 1; }
          50%       { transform: translateY(10px); opacity: 0.3; }
        }
        .cs-scroll-text {
          font-size: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.18);
          font-weight: 600;
        }

        /* ── MARQUEE: will-change for GPU compositing ── */
        .cs-marquee-section {
          position: relative;
          z-index: 2;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 1.1rem 0;
          overflow: hidden;
        }
        .cs-marquee-track {
          display: flex;
          animation: marquee-scroll 32s linear infinite;
          width: max-content;
          will-change: transform;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .cs-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 1.25rem;
          padding: 0 1.5rem;
          white-space: nowrap;
        }
        .cs-marquee-text {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.1);
        }
        .cs-marquee-dot {
          width: 3px; height: 3px;
          background: rgba(255,107,0,0.4);
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── FOOTER ── */
        .cs-footer {
          position: relative;
          z-index: 2;
          padding: 1.5rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 0.4rem;
          text-align: center;
        }
        @media (min-width: 600px) {
          .cs-footer {
            flex-direction: row;
            justify-content: space-between;
          }
        }
        .cs-footer-brand {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.2);
        }
        .cs-footer-brand span { color: #FF6B00; }
        .cs-footer-copy {
          font-size: 0.68rem;
          color: rgba(255,255,255,0.1);
          letter-spacing: 0.04em;
        }

        /* ── MOBILE SPECIFIC OVERRIDES ── */
        @media (max-width: 480px) {
          .cs-hero { padding: 4.5rem 1rem 4rem; }
          .cs-content { padding: 0 0.25rem; }
          .cs-badge { margin-bottom: 1.5rem; padding: 6px 14px; }
          .cs-sub { margin-bottom: 1.75rem; font-size: 0.9rem; }
          .cs-tags { margin-bottom: 1.75rem; gap: 0.35rem; }
          .cs-progress-wrap { margin-bottom: 1.75rem; }
          .cs-countdown { margin-bottom: 1.75rem; gap: 0.4rem; }
          .cs-form-wrap { margin-bottom: 1.5rem; }
          .cs-scroll-hint { display: none; } /* hidden on mobile — obvious to scroll */
        }
      `}</style>

      <div className="cs-root">
        {/* ── HERO ── */}
        <section className="cs-hero">
          {/* Orbs — radial-gradient, no blur filter, GPU composited */}
          <motion.div
            className="cs-orb cs-orb-1"
            animate={prefersReducedMotion ? {} : { x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
          />
          <motion.div
            className="cs-orb cs-orb-2"
            animate={prefersReducedMotion ? {} : { x: [0, -30, 15, 0], y: [0, 20, -15, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
          />
          <motion.div
            className="cs-orb cs-orb-3"
            animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="cs-grid" />
          <div className="cs-noise" />

          <div className="cs-content">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="cs-badge"
              id="dev-badge"
            >
              <span className="cs-badge-dot" />
              <span className="cs-badge-text">Currently Under Development</span>
              <span className="cs-badge-dot" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="cs-headline">
                <span className="cs-headline-white">Something</span>
                <span className="cs-headline-orange">Bold</span>
                <span className="cs-headline-dim">Is Coming</span>
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="cs-sub"
            >
              Creatorstick Media is crafting a next-generation platform for brands, creators, and
              storytellers. We&apos;re heads-down building — and we&apos;ll be live before you know it.
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="cs-tags"
            >
              {['Brand Strategy', 'Creator Marketing', 'Content Production', 'Digital Campaigns', 'Social Media'].map((t) => (
                <span key={t} className="cs-tag">{t}</span>
              ))}
            </motion.div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="cs-progress-wrap"
            >
              <div className="cs-progress-header">
                <span className="cs-progress-label">Development Progress</span>
                <span className="cs-progress-pct">65%</span>
              </div>
              <div className="cs-progress-track">
                <motion.div
                  className="cs-progress-fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 0.65 }}
                  transition={{ duration: 1.6, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <p className="cs-progress-label" style={{ marginBottom: '1rem' }}>Launching In</p>
              <div className="cs-countdown" id="countdown">
                <CountdownUnit value={days} label="Days" />
                <span className="cs-countdown-sep">:</span>
                <CountdownUnit value={hours} label="Hrs" />
                <span className="cs-countdown-sep">:</span>
                <CountdownUnit value={minutes} label="Min" />
                <span className="cs-countdown-sep">:</span>
                <CountdownUnit value={seconds} label="Sec" />
              </div>
            </motion.div>

            {/* Email Notify */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.15 }}
              className="cs-form-wrap"
            >
              <label className="cs-form-label" htmlFor="cs-email-input">
                Get notified on launch
              </label>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="cs-form-success"
                  >
                    <span className="cs-form-success-icon">✓</span>
                    You&apos;re on the list! We&apos;ll notify you at launch.
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="cs-form">
                      <input
                        id="cs-email-input"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        className="cs-input"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                        aria-label="Email address"
                      />
                      <button type="submit" className="cs-btn" id="cs-notify-btn">
                        Notify Me
                      </button>
                    </div>
                    {error && <p className="cs-form-error">{error}</p>}
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="cs-social"
              aria-label="Social media links"
            >
              {[
                {
                  title: 'Instagram',
                  href: 'https://instagram.com/creatorstick',
                  icon: (
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ),
                },
                {
                  title: 'LinkedIn',
                  href: 'https://linkedin.com/company/creatorstick',
                  icon: (
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                },
                {
                  title: 'X / Twitter',
                  href: 'https://twitter.com/creatorstick',
                  icon: (
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ),
                },
                {
                  title: 'YouTube',
                  href: 'https://youtube.com/@creatorstick',
                  icon: (
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.title}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-social-link"
                  aria-label={s.title}
                  title={s.title}
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="cs-scroll-hint"
          >
            <div className="cs-scroll-mouse">
              <div className="cs-scroll-dot" />
            </div>
            <span className="cs-scroll-text">Scroll</span>
          </motion.div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="cs-marquee-section">
          <div className="cs-marquee-track">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="cs-marquee-item">
                <span className="cs-marquee-text">{item}</span>
                <span className="cs-marquee-dot" />
              </span>
            ))}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer className="cs-footer">
          <div className="cs-footer-brand">
            CREATOR<span>STICK</span> MEDIA
          </div>
          <div className="cs-footer-copy">
            © {new Date().getFullYear()} Creatorstick Media Pvt Ltd. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
