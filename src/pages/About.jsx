import React from 'react';
import { motion } from 'framer-motion';

const techStack = [
  { name: 'React 18',       desc: 'Functional components and hooks',         icon: '⚛' },
  { name: 'Vite',           desc: 'Lightning-fast HMR build tooling',        icon: '⚡' },
  { name: 'TailwindCSS',    desc: 'Utility-first CSS with custom theme',      icon: '🎨' },
  { name: 'Framer Motion',  desc: '3D carousel animations & page transitions',icon: '🎞' },
  { name: 'React Router',   desc: 'Multi-page navigation and deep linking',   icon: '🔗' },
];

const About = () => (
  <div className="relative min-h-screen py-14 px-6 md:px-10">
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="font-orbitron text-[10px] tracking-[0.4em] mb-3" style={{ color: '#0a1a0a', opacity: 0.45 }}>
          SYSTEM INFORMATION
        </div>
        <h1 className="font-orbitron font-black text-3xl md:text-4xl mb-4" style={{ color: '#0a1a0a' }}>
          ABOUT THIS PROJECT
        </h1>
        <div className="h-px max-w-xs mx-auto" style={{ background: 'rgba(0,0,0,0.25)' }} />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5">

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-6 md:col-span-2"
          style={{ background: 'rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.15)' }}
        >
          <div className="font-orbitron text-[9px] tracking-widest mb-3" style={{ color: '#0a1a0a', opacity: 0.45 }}>◆ PROJECT OVERVIEW</div>
          <h2 className="font-orbitron text-xl mb-4" style={{ color: '#0a1a0a' }}>Ben 10 — Alienverse</h2>
          <p className="font-rajdhani text-base leading-relaxed mb-4" style={{ color: '#0a1a0a', opacity: 0.75 }}>
            Alienverse is an interactive fan tribute to the Ben 10 universe, built as a modern web application simulating the Omnitrix interface. Browse all alien transformations with a 3D depth carousel and full DNA profiles.
          </p>
          <p className="font-rajdhani text-base leading-relaxed" style={{ color: '#0a1a0a', opacity: 0.65 }}>
            The left panel uses drag-or-double-click navigation to scroll through aliens in a physically immersive 3D rotation — matching the tactile feel of the original Omnitrix watch dial.
          </p>
        </motion.div>

        {/* Inspiration */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="p-6"
          style={{ background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.12)' }}
        >
          <div className="font-orbitron text-[9px] tracking-widest mb-3" style={{ color: '#0a1a0a', opacity: 0.45 }}>◆ INSPIRATION</div>
          <p className="font-rajdhani text-sm leading-relaxed" style={{ color: '#0a1a0a', opacity: 0.7 }}>
            Inspired by the Omnitrix holographic UI from the original Ben 10 series — dark panels, green energy accents, circular elements, and the feeling of selecting aliens inside a living device.
          </p>
          {/* Omnitrix image placeholder */}
          <div className="mt-6 flex justify-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
              style={{ background: '#0a1a0a', border: '2px solid rgba(0,0,0,0.3)' }}
            >
              <img
                src="/assets/omnitrix.png"
                alt="Omnitrix"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
                className="w-full h-full object-cover"
              />
              <div className="hidden font-orbitron text-[8px] text-center" style={{ color: '#1a8c2e' }}>
                OMNITRIX
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="p-6"
          style={{ background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.12)' }}
        >
          <div className="font-orbitron text-[9px] tracking-widest mb-4" style={{ color: '#0a1a0a', opacity: 0.45 }}>◆ TECH STACK</div>
          <div className="space-y-2.5">
            {techStack.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="flex items-start gap-3 p-2.5"
                style={{ background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.1)' }}
              >
                <span className="text-base flex-shrink-0">{t.icon}</span>
                <div>
                  <div className="font-orbitron text-[10px] font-bold" style={{ color: '#0a1a0a' }}>{t.name}</div>
                  <div className="font-rajdhani text-xs" style={{ color: '#0a1a0a', opacity: 0.55 }}>{t.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
        className="text-center mt-10"
      >
        <p className="font-rajdhani text-sm" style={{ color: '#0a1a0a', opacity: 0.3 }}>
          Fan-made educational project. Ben 10 and related characters are property of Cartoon Network.
        </p>
        <div className="font-orbitron text-[10px] tracking-widest mt-2" style={{ color: '#0a1a0a', opacity: 0.2 }}>
          IT'S HERO TIME.
        </div>
      </motion.div>
    </div>
  </div>
);

export default About;
