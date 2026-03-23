import React from 'react';
import { motion } from 'framer-motion';

const SearchBar = ({ value, onChange }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.35, duration: 0.45 }}
    className="relative w-full max-w-xl mx-auto"
  >
    <div
      className="flex items-center gap-3 px-5 py-3"
      style={{
        background: 'rgba(0,0,0,0.12)',
        border: '1.5px solid rgba(0,0,0,0.25)',
      }}
    >
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#0a1a0a" strokeWidth={2.5} viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="SEARCH ALIEN DATABASE..."
        className="flex-1 bg-transparent outline-none font-orbitron text-xs tracking-widest placeholder-opacity-30"
        style={{ color: '#0a1a0a', caretColor: '#0a1a0a' }}
      />
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-og-dark animate-ping" style={{ background: '#0a1a0a' }} />
        <span className="font-orbitron text-[9px] tracking-widest opacity-40" style={{ color: '#0a1a0a' }}>LIVE</span>
      </div>
    </div>
  </motion.div>
);

export default SearchBar;
