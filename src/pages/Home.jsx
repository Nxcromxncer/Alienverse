import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import AlienCard from '../components/AlienCard';
import { aliens } from '../data/aliens';

const Home = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return aliens;
    const q = query.toLowerCase();
    return aliens.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.species.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.homeworld.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="relative min-h-screen pt-8 pb-16 px-6 md:px-10">

      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center mb-12 pt-6">

        {/* Omnitrix circle — placeholder for your image */}
        <div className="mx-auto mb-7 flex justify-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: '#050505',
              border: '3px solid rgba(0,0,0,0.4)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
            }}
          >
            <img
              src="/assets/omnitrix.png"
              alt="Omnitrix"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
              className="w-full h-full object-cover"
            />
            <div className="hidden w-full h-full rounded-full items-center justify-center">
              <div className="w-8 h-8 rounded-full" style={{ background: '#1a8c2e' }} />
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div
            className="font-orbitron text-[10px] tracking-[0.45em] mb-2"
            style={{ color: '#0a1a0a', opacity: 0.55 }}
          >
            OMNITRIX INTERFACE v10.0
          </div>
          <h1
            className="font-orbitron font-black text-5xl md:text-6xl mb-2 tracking-tight"
            style={{ color: '#0a1a0a' }}
          >
            BEN 10
          </h1>
          <h2
            className="font-orbitron text-lg tracking-widest mb-5"
            style={{ color: '#0a1a0a', opacity: 0.55 }}
          >
            ALIENVERSE
          </h2>
          <p
            className="font-rajdhani text-base max-w-md mx-auto leading-relaxed"
            style={{ color: '#0a1a0a', opacity: 0.65 }}
          >
            Access the complete Omnitrix alien database. Browse transformations, analyze DNA profiles and explore species from across the universe.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex items-center justify-center gap-10 mt-7 mb-8"
        >
          {[
            { label: 'ALIENS',  value: aliens.length },
            { label: 'SPECIES', value: aliens.length },
            { label: 'STATUS',  value: 'ONLINE' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-orbitron text-2xl font-black" style={{ color: '#0a1a0a' }}>{s.value}</div>
              <div className="font-orbitron text-[9px] tracking-widest mt-0.5" style={{ color: '#0a1a0a', opacity: 0.45 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        <SearchBar value={query} onChange={setQuery} />
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto mb-6 flex items-center gap-4">
        <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.18)' }} />
        <span className="font-orbitron text-[10px] tracking-widest" style={{ color: '#0a1a0a', opacity: 0.45 }}>
          {filtered.length} ALIEN{filtered.length !== 1 ? 'S' : ''} FOUND
        </span>
        <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.18)' }} />
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div key="grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((alien, i) => <AlienCard key={alien.id} alien={alien} index={i} />)}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="font-orbitron text-sm tracking-widest" style={{ color: '#0a1a0a', opacity: 0.4 }}>
                NO MATCH IN DATABASE
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
