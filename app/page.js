'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from './components/ScrollReveal';
import ParallaxText, { ParallaxMarquee } from './components/ParallaxText';
import AnimatedCounter from './components/AnimatedCounter';
import MagneticButton from './components/MagneticButton';

// Detect mobile once on the client so we can skip heavy scroll-driven transforms
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

/* ─── ALL 8 SERVICES ─── */
const services = [
  {
    num: '01',
    title: 'Brand Strategy',
    desc: 'We craft compelling brand narratives that resonate with your audience and drive meaningful engagement across all touchpoints.',
    icon: '◆',
    href: '/services/brand-strategy',
  },
  {
    num: '02',
    title: 'Creator Marketing',
    desc: 'Connect with top-tier creators who authentically represent your brand and amplify your message to millions.',
    icon: '▲',
    href: '/services/influencer-marketing',
  },
  {
    num: '03',
    title: 'Content Production',
    desc: 'From concept to delivery, we produce stunning visual content that captivates audiences and elevates your brand.',
    icon: '●',
    href: '/services/content-production',
  },
  {
    num: '04',
    title: 'Social Media Management',
    desc: 'Full-service social media management that grows communities and creates meaningful conversations.',
    icon: '◈',
    href: '/services/social-media',
  },
  {
    num: '05',
    title: 'Paid Media & Ads',
    desc: 'Strategic ad placement and optimization to reach the right audience at the right moment with precision.',
    icon: '✦',
    href: '/services/paid-media',
  },
  {
    num: '06',
    title: 'Video Production',
    desc: 'Cinematic video production that captures attention and inspires action — from brand films to social reels.',
    icon: '▶',
    href: '/services/video-production',
  },
  {
    num: '07',
    title: 'Digital Product Development',
    desc: 'Beautiful, fast, and conversion-focused websites, apps, and landing pages built to drive business results.',
    icon: '■',
    href: '/services/web-development',
  },
  {
    num: '08',
    title: 'Strategic Consulting',
    desc: 'Direct access to senior strategists for marketing audits, go-to-market plans, and ongoing advisory.',
    icon: '★',
    href: '/services/consulting',
  },
];

const capabilities = [
  'BRANDING', 'INTERIOR SHOOTS', 'FASHION CAMPAIGNS', 'REAL ESTATE',
  'CONTENT CREATION', 'SOCIAL MEDIA', 'PERFORMANCE MARKETING',
  'CREATOR PARTNERSHIPS', 'DIGITAL STRATEGY', 'VIDEO PRODUCTION',
  'INFLUENCER MARKETING', 'BRAND STORYTELLING',
];

const stats = [
  { number: 0, suffix: '+', label: 'Projects Launched' },
  { number: 0, suffix: '+', label: 'Happy Clients' },
  { number: 100, suffix: '%', label: 'Passion Driven' },
  { number: 0, suffix: '+', label: 'Reach Generated' },
];


/* ─── PORTFOLIO CATEGORIES with real images ─── */
const portfolioCategories = [
  { name: 'Interior Photography', slug: 'interior-photography', cover: '/work/interior-1.jpg', span: 'col-span-1 row-span-2' },
  { name: 'Fashion Campaigns', slug: 'fashion-campaigns', cover: '/work/fashion-1.jpg', span: 'col-span-1' },
  { name: 'Food Photography', slug: 'food-photography', cover: '/work/food-1.jpg', span: 'col-span-1' },
  { name: 'Product Photography', slug: 'product-photography', cover: '/work/product-1.jpg', span: 'col-span-1' },
  { name: 'Jewellery', slug: 'jewellery', cover: '/work/jewellery-1.jpg', span: 'col-span-1' },
  { name: 'Spot Photography', slug: 'spot', cover: '/work/spot-1.jpg', span: 'col-span-1' },
];

export default function Home() {
  const isMobile = useIsMobile();

  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // On mobile, scroll-driven transforms run on the JS thread every tick and cause
  // jank — keep them but return static values so framer skips the interpolation.
  const heroYRaw = useTransform(heroScrollProgress, [0, 1], [0, 200]);
  const heroOpacityRaw = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);
  const heroScaleRaw = useTransform(heroScrollProgress, [0, 1], [1, 0.9]);

  const heroY       = isMobile ? 0       : heroYRaw;
  const heroOpacity = isMobile ? 1       : heroOpacityRaw;
  const heroScale   = isMobile ? 1       : heroScaleRaw;

  const scrollFrameRef = useRef(null);
  const { scrollYProgress: frameProgress } = useScroll({
    target: scrollFrameRef,
    offset: ['start end', 'end start'],
  });

  const frameScaleRaw  = useTransform(frameProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const frameRotateRaw = useTransform(frameProgress, [0, 1], [-5, 5]);

  const frameScale  = isMobile ? 1 : frameScaleRaw;
  const frameRotate = isMobile ? 0 : frameRotateRaw;

  return (
    <div className="relative">
      {/* ============= HERO SECTION ============= */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-16">
        {/* Background Grid */}
        <div className="absolute inset-0 grid-pattern" />
        
        {/* Animated Gradient Orbs
             Desktop: JS-driven keyframe movement (GPU-composited with will-change)
             Mobile: static position — blur + continuous paint is too expensive on low-end GPUs */}
        {!isMobile ? (
          <>
            <motion.div
              animate={{ x: [0, 100, -50, 0], y: [0, -80, 50, 0], scale: [1, 1.2, 0.9, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ willChange: 'transform' }}
              className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange/10 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{ x: [0, -80, 60, 0], y: [0, 60, -40, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              style={{ willChange: 'transform' }}
              className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-orange/5 rounded-full blur-[100px]"
            />
          </>
        ) : (
          <>
            {/* Static orbs on mobile — same visual, zero JS animation cost */}
            <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-orange/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] bg-orange/5 rounded-full blur-[60px] pointer-events-none" />
          </>
        )}

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale, willChange: 'transform, opacity' }}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center justify-center flex-1"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 glass-light rounded-full px-3 py-1.5 sm:px-5 sm:py-2 mb-6"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange rounded-full animate-pulse flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium tracking-tight sm:tracking-wide whitespace-nowrap" style={{ color: 'var(--muted)' }}>CreatorStick Media — Fresh. Bold. Creative.</span>
          </motion.div>

          {/* Hero Heading */}
          <div className="overflow-hidden pt-1 pb-8 -mb-7">
            <motion.h1
              initial={{ y: 150 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-montserrat leading-[0.95] tracking-tight pb-[0.2em] -mb-[0.2em]"
              style={{ color: 'var(--heading)' }}
            >
              We Create
            </motion.h1>
          </div>
          <div className="overflow-hidden pt-1 pb-8 -mb-7">
            <motion.h1
              initial={{ y: 150 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-montserrat leading-[0.95] tracking-tight gradient-text pb-[0.2em] -mb-[0.2em]"
            >
              Digital Impact
            </motion.h1>
          </div>
          <div className="overflow-hidden pt-1 pb-8 -mb-3">
            <motion.h1
              initial={{ y: 150 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-montserrat leading-[0.95] tracking-tight pb-[0.2em] -mb-[0.2em]"
              style={{ color: 'var(--text-subtle)' }}
            >
              That Lasts
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            CreatorStick Media is a new-age media agency on a mission to transform brands through bold storytelling, 
            creative campaigns, and next-gen digital strategy. We specialize in content growth, brand building, and digital product development.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/book"
              className="bg-orange hover:bg-[#ff8533] text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,107,0,0.4)] hover:scale-105"
              style={{ color: '#ffffff' }}
            >
              Start Your Project
            </Link>
            <Link
              href="/for-brands"
              className="px-10 py-4 rounded-full text-lg font-medium transition-all duration-300"
              style={{ color: 'var(--heading)', border: '1px solid var(--border-hover)' }}
            >
              Explore Services
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="relative z-10 mt-auto"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full flex items-start justify-center p-1"
            style={{ border: '2px solid var(--border-hover)' }}
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-orange rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ============= MARQUEE ============= */}
      <section className="py-8" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <ParallaxMarquee text="CREATORSTICK MEDIA" />
      </section>

      {/* ============= CAPABILITIES MARQUEE ============= */}
      <section className="py-16" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.2em] text-center mb-10" style={{ color: 'var(--muted)' }}>
              What We Bring to the Table
            </p>
          </ScrollReveal>
          <div className="overflow-hidden">
            <div className="animate-marquee flex">
              {[...capabilities, ...capabilities].map((cap, i) => (
                <span
                  key={i}
                  className="mx-8 flex items-center gap-4 whitespace-nowrap"
                >
                  <span className="text-xl md:text-2xl font-bold font-montserrat tracking-widest cursor-default hover:text-orange transition-colors duration-500" style={{ color: 'var(--text-subtle)' }}>
                    {cap}
                  </span>
                  <span className="text-orange text-xs">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============= ABOUT SECTION ============= */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal direction="left">
                <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                  Who We Are
                </p>
                <h2 className="text-4xl md:text-6xl font-bold font-montserrat leading-tight mb-6" style={{ color: 'var(--heading)' }}>
                  The New Era of <br />
                  <span className="gradient-text">Media & Creativity</span>
                </h2>
                <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
                  CreatorStick Media is a fresh, hungry, and ambitious team of creatives, 
                  strategists, and storytellers. We launched with a single mission — to help 
                  brands stand out in a noisy digital world through authentic content, smart 
                  strategy, and relentless innovation. Our expertise spans content growth, brand building,
                  and digital product development for startups, college communities, and businesses.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/for-brands"
                    className="bg-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-[#ff8533] transition-all duration-300"
                    style={{ color: '#ffffff' }}
                  >
                    Our Work
                  </Link>
                  <Link
                    href="/careers"
                    className="px-8 py-3 rounded-full font-medium transition-all duration-300 hover:text-orange"
                    style={{ color: 'var(--heading)', border: '1px solid var(--border-hover)' }}
                  >
                    Join Us
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right">
              <div ref={scrollFrameRef} className="relative">
                <motion.div
                  className="aspect-square rounded-3xl p-8 flex items-center justify-center"
                  style={{ scale: frameScale, rotateZ: frameRotate, background: 'linear-gradient(135deg, var(--card-glow), transparent)', border: '1px solid var(--border)' }}
                >
                  <div className="text-center">
                    <div className="text-7xl md:text-8xl font-bold gradient-text font-montserrat mb-2">∞</div>
                    <div style={{ color: 'var(--heading)' }} className="text-xl font-bold font-montserrat mb-1">Limitless Ideas</div>
                    <div style={{ color: 'var(--muted)' }} className="text-sm">One Bold Vision</div>
                  </div>
                </motion.div>
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 w-20 h-20 bg-orange/10 rounded-2xl border border-orange/20 flex items-center justify-center"
                >
                  <span className="text-orange text-2xl">◆</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--glass-light-bg)', border: '1px solid var(--glass-light-border)' }}
                >
                  <span className="text-xl" style={{ color: 'var(--muted)' }}>✦</span>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============= STATS SECTION ============= */}
      <section className="py-20" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold font-montserrat mb-2" style={{ color: 'var(--heading)' }}>
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= SERVICES SECTION — ALL 8 ============= */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                What We Do
              </p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                Our <span className="gradient-text">Services</span>
              </h2>
              <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
                From brand strategy to digital product development — CreatorStick Media delivers end-to-end creative solutions for brands, creators, and businesses.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <Link href={service.href}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="group p-6 rounded-2xl cursor-pointer h-full transition-all duration-500 t-card"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl text-orange/50 group-hover:text-orange transition-colors">
                        {service.icon}
                      </span>
                      <span className="text-xs font-mono" style={{ color: 'var(--text-subtle)' }}>{service.num}</span>
                    </div>
                    <h3 className="text-lg font-bold font-montserrat mb-2 group-hover:text-orange transition-colors" style={{ color: 'var(--heading)' }}>
                      {service.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {service.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-orange text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn More
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= OUR WORK / PORTFOLIO — REAL PHOTO GRID ============= */}
      <section className="py-32 relative" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-6">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">Portfolio</p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                Our <span className="gradient-text">Work</span>
              </h2>
              <p className="text-base mt-4 max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
                From luxury interiors to high-end fashion campaigns — explore our creative work across categories.
              </p>
            </div>
          </ScrollReveal>

          {/* Masonry-style photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-14">
            {portfolioCategories.map((cat, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                    i === 0 ? 'row-span-2 aspect-[3/4] md:aspect-auto md:h-[500px]' : 'aspect-[4/3]'
                  }`}
                  style={{ border: '1px solid var(--border)' }}
                >
                  {/* Real photo */}
                  <Image
                    src={cat.cover}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width:768px) 50vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block bg-orange/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{cat.name}</span>
                    <h3 className="text-white font-bold font-montserrat text-sm md:text-base leading-tight">{cat.name}</h3>
                  </div>
                  {/* View icon */}
                  <div className="absolute top-3 right-3 w-9 h-9 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6" /><path d="M10 14L21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-10">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 bg-orange hover:bg-[#ff8533] px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,0,0.3)] hover:scale-105"
                style={{ color: '#ffffff' }}
              >
                View All Work <span>→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============= PARALLAX TEXT ============= */}
      <section className="py-20 relative overflow-hidden">
        <ParallaxText speed={-0.3} axis="x" className="text-center">
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bold font-montserrat uppercase tracking-tight leading-none" style={{ color: 'var(--text-subtle)' }}>
            Strategy
          </h2>
        </ParallaxText>
        <ParallaxText speed={0.3} axis="x" className="text-center -mt-8">
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bold font-montserrat gradient-text uppercase tracking-tight leading-none">
            Creativity
          </h2>
        </ParallaxText>
        <ParallaxText speed={-0.2} axis="x" className="text-center -mt-8">
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bold font-montserrat uppercase tracking-tight leading-none" style={{ color: 'var(--text-subtle)' }}>
            Results
          </h2>
        </ParallaxText>
      </section>

      {/* ============= HOW IT WORKS — CONNECTED STEPPER ============= */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Our Process
              </p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                How We <span className="gradient-text">Work</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[52px] left-[12.5%] right-[12.5%] h-[2px]" style={{ background: 'linear-gradient(90deg, rgba(255,107,0,0.15), rgba(255,107,0,0.4), rgba(255,107,0,0.4), rgba(255,107,0,0.15)' }} />
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Connect', desc: 'We start by understanding your brand, audience, and goals through a deep-dive discovery call.' },
                { step: '02', title: 'Strategy', desc: 'Develop data-driven strategies tailored to your unique objectives, audience, and market position.' },
                { step: '03', title: 'Execution', desc: 'Bring ideas to life with precision, creativity, and unwavering quality standards across all channels.' },
                { step: '04', title: 'Growth', desc: 'Continuously refine and improve based on real performance data, insights, and feedback loops.' },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.15}>
                  <motion.div whileHover={{ y: -8 }} className="relative text-center">
                    {/* Step circle */}
                    <div className="relative inline-flex w-24 h-24 mx-auto mb-6 items-center justify-center">
                      <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255,107,0,0.08)', border: '2px solid rgba(255,107,0,0.25)' }} />
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ border: '2px solid rgba(255,107,0,0.4)' }}
                        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      />
                      <span className="text-2xl font-bold gradient-text font-montserrat">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-bold font-montserrat mb-3" style={{ color: 'var(--heading)' }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item.desc}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============= NAKSHATRA / COLLEGE FEST SECTION ============= */}
      <section className="py-32 relative" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <ScrollReveal direction="left">
              <div>
                <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                  Featured Case Study
                </p>
                <h2 className="text-4xl md:text-5xl font-bold font-montserrat leading-tight mb-6" style={{ color: 'var(--heading)' }}>
                  How We Grew
                  <br />
                  <span className="gradient-text">Nakshatra to 2M+ Reach</span>
                </h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                  Nakshatra Cultural Fest at MIT AOE needed a digital transformation. CreatorStick Media
                  stepped in with a comprehensive content growth strategy — from reel series and 
                  countdown campaigns to influencer collaborations and strategic hashtag targeting.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    'Strategic content calendar & reel campaigns',
                    '2M+ total impressions across all content',
                    'Hashtag strategy maximising organic reach',
                    'Engagement rate boosted by 500%',
                    'Brand building through consistent storytelling',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-orange text-xs flex-shrink-0">✦</span>
                      <span className="text-sm" style={{ color: 'var(--muted)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.instagram.com/nakshatra__mitaoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-orange hover:bg-[#ff8533] text-white px-7 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,0,0.3)]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                    @nakshatra__mitaoe
                  </a>
                  <Link
                    href="/blog/journey-of-nakshatra-reaching-millions"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold transition-all duration-300"
                    style={{ color: 'var(--heading)', border: '1px solid var(--border-hover)' }}
                  >
                    Read Case Study →
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Metrics Card */}
            <ScrollReveal direction="right">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-3xl p-8 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.08) 0%, var(--card-bg) 100%)', border: '1px solid rgba(255,107,0,0.2)' }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-orange/40 rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-orange/40 rounded-br-3xl" />

                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-orange/10 rounded-full px-4 py-2 mb-4">
                    <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-orange">@nakshatra__mitaoe</span>
                  </div>
                  <h3 className="text-2xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>Nakshatra Cultural Fest</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>MIT AOE • Managed by CreatorStick Media</p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { value: '2M+', label: 'Total Reach', color: '#FF6B00' },
                    { value: '15K+', label: 'Engagement', color: '#6366f1' },
                    { value: '500%', label: 'Growth', color: '#10b981' },
                  ].map((m, i) => (
                    <div key={i} className="text-center p-4 rounded-2xl" style={{ background: `${m.color}08`, border: `1px solid ${m.color}20` }}>
                      <div className="text-2xl md:text-3xl font-bold font-montserrat" style={{ color: m.color }}>{m.value}</div>
                      <div className="text-xs uppercase tracking-wider mt-1" style={{ color: 'var(--muted)' }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    Our content growth strategy transformed Nakshatra&apos;s social media presence, 
                    making it one of the most followed college fest accounts in the region.
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============= WHO WE SERVE ============= */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Who We Serve
              </p>
              <h2 className="text-4xl md:text-6xl font-bold font-montserrat" style={{ color: 'var(--heading)' }}>
                Solutions For <span className="gradient-text">Everyone</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'For Brands', desc: 'Strategic partnerships and campaigns that amplify your brand presence and drive content growth.', href: '/for-brands', icon: '◆' },
              { title: 'For Creators', desc: 'Grow your influence with premium brand collaborations and support from CreatorStick Media.', href: '/for-creators', icon: '▲' },
              { title: 'Small Business', desc: 'Affordable, impactful marketing and brand building solutions tailored to your budget.', href: '/for-small-business', icon: '●' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <Link href={item.href} className="block group">
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="p-8 rounded-2xl transition-all duration-500 h-full t-card"
                  >
                    <span className="text-4xl text-orange/30 group-hover:text-orange transition-colors block mb-6">
                      {item.icon}
                    </span>
                    <h3 className="text-xl font-bold font-montserrat mb-3 group-hover:text-orange transition-colors" style={{ color: 'var(--heading)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>{item.desc}</p>
                    <span className="text-orange text-sm font-medium flex items-center gap-2">
                      Explore
                      <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </span>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
