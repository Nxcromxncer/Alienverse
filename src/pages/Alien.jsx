import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AlienCarousel from '../components/AlienCarousel';
import { aliens } from '../data/aliens';

const AlienPage = () => {
  const [searchParams] = useSearchParams();
  const idParam = parseInt(searchParams.get('id')) || 1;
  const startIndex = Math.max(0, aliens.findIndex((a) => a.id === idParam));
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const active = aliens[activeIndex];

  useEffect(() => {
    document.title = `${active.name} — Ben 10 Alienverse`;
    return () => { document.title = 'Ben 10 Alienverse'; };
  }, [active]);

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row">

      {/* ═══ LEFT: image carousel only ═══ */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-10 px-4 lg:sticky lg:top-0 lg:h-screen">

        {/* Alien name */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id + '-name'}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="text-center mb-6"
          >
            <div
              className="font-orbitron font-black text-5xl tracking-wider"
              style={{ color: '#0a1a0a' }}
            >
              {active.name.toUpperCase()}
            </div>
            <div
              className="font-rajdhani text-sm tracking-widest mt-1"
              style={{ color: '#0a1a0a', opacity: 0.5 }}
            >
              {active.species} · {active.homeworld}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-xl">
          <AlienCarousel
            aliens={aliens}
            initialIndex={startIndex}
            onSelect={setActiveIndex}
          />
        </div>
      </div>

      {/* ═══ RIGHT: profile ═══ */}
      <div
        className="w-full lg:w-1/2 px-8 py-10"
        style={{ background: 'rgba(0,0,0,0.1)', borderLeft: '1px solid rgba(0,0,0,0.12)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id + '-profile'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="space-y-5 max-w-lg"
          >
            {/* Header */}
            <div>
              <div className="font-orbitron text-[9px] tracking-[0.35em] mb-2" style={{ color: '#0a1a0a', opacity: 0.45 }}>
                TRANSFORMATION PROFILE
              </div>
              <h2 className="font-orbitron font-black text-3xl" style={{ color: '#0a1a0a' }}>
                {active.name}
              </h2>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'SPECIES',   val: active.species },
                { label: 'HOMEWORLD', val: active.homeworld },
                { label: 'CLASS',     val: active.category },
              ].map((s) => (
                <div key={s.label} className="p-3 text-center panel">
                  <div className="font-orbitron text-[8px] tracking-widest mb-1" style={{ color: '#0a1a0a', opacity: 0.45 }}>{s.label}</div>
                  <div className="font-rajdhani font-bold text-sm leading-tight" style={{ color: '#0a1a0a' }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="p-5 panel">
              <div className="font-orbitron text-[9px] tracking-widest mb-3" style={{ color: '#0a1a0a', opacity: 0.45 }}>SPECIES ANALYSIS</div>
              <p className="font-rajdhani text-base leading-relaxed" style={{ color: '#0a1a0a', opacity: 0.8 }}>{active.description}</p>
            </div>

            {/* Abilities */}
            <div className="p-5 panel">
              <div className="font-orbitron text-[9px] tracking-widest mb-4" style={{ color: '#0a1a0a', opacity: 0.45 }}>COMBAT ABILITIES</div>
              <div className="grid grid-cols-2 gap-2">
                {active.abilities.map((ability, i) => (
                  <motion.div
                    key={ability}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-2 p-2.5 panel"
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#0a1a0a' }} />
                    <span className="font-rajdhani font-semibold text-sm" style={{ color: '#0a1a0a' }}>{ability}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Power */}
            <div className="p-5 panel">
              <div className="flex items-center justify-between mb-3">
                <div className="font-orbitron text-[9px] tracking-widest" style={{ color: '#0a1a0a', opacity: 0.45 }}>POWER LEVEL</div>
                <div className="font-orbitron text-sm font-bold" style={{ color: '#0a1a0a' }}>{active.power} / 100</div>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.15)' }}>
                <motion.div
                  key={active.id}
                  initial={{ width: 0 }}
                  animate={{ width: `${active.power}%` }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: '#0a1a0a' }}
                />
              </div>
              <div className="font-orbitron text-[9px] tracking-widest mt-2 text-right" style={{ color: '#0a1a0a', opacity: 0.45 }}>
                {active.power >= 90 ? 'APEX CLASS' : active.power >= 80 ? 'ELITE CLASS' : 'STANDARD CLASS'}
              </div>
            </div>

            <div className="font-orbitron text-[9px] tracking-widest text-center py-3" style={{ color: '#0a1a0a', opacity: 0.3, borderTop: '1px solid rgba(0,0,0,0.12)' }}>
              DNA PROFILE · ID:{String(active.id).padStart(8, '0')}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AlienPage;
