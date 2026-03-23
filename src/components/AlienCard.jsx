import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AlienCard = ({ alien, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.055, duration: 0.38, ease: 'easeOut' }}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={() => navigate(`/aliens?id=${alien.id}`)}
      className="alien-card overflow-hidden cursor-pointer group"
    >
      {/* Image area */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.1)' }}
      >
        <img
          src={`/assets/aliens/alien${alien.id}.png`}
          alt={alien.name}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
          className="h-32 w-32 object-contain"
          draggable={false}
        />
        {/* Fallback */}
        <div
          className="hidden h-24 w-24 rounded-full items-center justify-center font-orbitron font-bold text-3xl"
          style={{ background: 'rgba(0,0,0,0.15)', border: '2px solid rgba(0,0,0,0.25)', color: '#0a1a0a' }}
        >
          {alien.name.charAt(0)}
        </div>

        {/* Category badge */}
        <div
          className="absolute top-3 right-3 px-2 py-0.5 font-orbitron text-[9px] tracking-wider"
          style={{ background: 'rgba(0,0,0,0.2)', color: '#0a1a0a', border: '1px solid rgba(0,0,0,0.2)' }}
        >
          {alien.category.toUpperCase()}
        </div>
      </div>

      {/* Info */}
      <div className="p-4" style={{ background: 'rgba(0,0,0,0.06)' }}>
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="font-orbitron font-bold text-sm tracking-wide" style={{ color: '#0a1a0a' }}>
            {alien.name}
          </h3>
          <div className="font-orbitron text-xs font-bold" style={{ color: '#0a1a0a', opacity: 0.6 }}>
            {alien.power}
          </div>
        </div>

        <p className="font-rajdhani text-xs mb-2" style={{ color: '#0a1a0a', opacity: 0.5 }}>
          {alien.species} · {alien.homeworld}
        </p>

        <p className="font-rajdhani text-sm leading-relaxed line-clamp-2" style={{ color: '#0a1a0a', opacity: 0.7 }}>
          {alien.description}
        </p>

        {/* Power bar */}
        <div className="mt-3 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.15)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${alien.power}%` }}
            transition={{ delay: index * 0.055 + 0.3, duration: 0.7, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: '#0a1a0a' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AlienCard;
