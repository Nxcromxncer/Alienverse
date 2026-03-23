import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AlienCarousel — clean 3D image-only alien selector.
 *
 * Navigation:
 *   - Double-click left half  → go to previous alien
 *   - Double-click right half → go to next alien
 *   - Click-drag left/right   → swipe to navigate (threshold: 60px)
 *
 * Visual layout (3D depth):
 *   LEFT image  — scale 0.65, rotateY +35deg, blur 4px, opacity 0.4
 *   CENTER image — scale 1.0,  rotateY 0,     blur 0,   opacity 1, floating
 *   RIGHT image — scale 0.65, rotateY -35deg, blur 4px, opacity 0.4
 *
 * No boxes, no corner decorations, no SVGs — pure PNG images.
 * Images load from /assets/aliens/alien{id}.png
 */

const spring = { type: 'spring', stiffness: 300, damping: 30 };

const SLOTS = {
  left: {
    x: '-46%', scale: 0.62, rotateY: 38, opacity: 0.35,
    filter: 'blur(5px)', zIndex: 1,
  },
  center: {
    x: '0%',   scale: 1.0,  rotateY: 0,  opacity: 1,
    filter: 'blur(0px)', zIndex: 10,
  },
  right: {
    x: '46%',  scale: 0.62, rotateY: -38, opacity: 0.35,
    filter: 'blur(5px)', zIndex: 1,
  },
};

const mod = (n, m) => ((n % m) + m) % m;

const AlienCarousel = ({ aliens, initialIndex = 0, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // Drag state
  const dragStart = useRef(null);
  const isDragging = useRef(false);

  const total = aliens.length;
  const prevIdx = mod(activeIndex - 1, total);
  const nextIdx = mod(activeIndex + 1, total);

  const goTo = useCallback((newIdx) => {
    setActiveIndex(newIdx);
    onSelect?.(newIdx);
  }, [onSelect]);

  // ── Drag handlers ─────────────────────────────────────────
  const handleMouseDown = (e) => {
    dragStart.current = e.clientX;
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (dragStart.current !== null && Math.abs(e.clientX - dragStart.current) > 8) {
      isDragging.current = true;
    }
  };

  const handleMouseUp = (e) => {
    if (dragStart.current === null) return;
    const delta = e.clientX - dragStart.current;
    dragStart.current = null;
    if (!isDragging.current) return;
    isDragging.current = false;
    if (delta < -60) goTo(nextIdx);
    else if (delta > 60) goTo(prevIdx);
  };

  // Touch support
  const touchStart = useRef(null);
  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (delta < -60) goTo(nextIdx);
    else if (delta > 60) goTo(prevIdx);
  };

  // Double-click half-screen navigation
  const handleDoubleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const midX = rect.left + rect.width / 2;
    if (e.clientX < midX) goTo(prevIdx);
    else goTo(nextIdx);
  };

  // ── Render a slot ─────────────────────────────────────────
  const renderSlot = (alien, position) => {
    const s = SLOTS[position];
    const isCenter = position === 'center';

    return (
      <motion.div
        key={`${position}-${alien.id}`}
        className="absolute inset-0 flex items-center justify-center"
        animate={{ x: s.x, scale: s.scale, rotateY: s.rotateY, opacity: s.opacity, filter: s.filter, zIndex: s.zIndex }}
        transition={spring}
        style={{ transformStyle: 'preserve-3d', zIndex: s.zIndex, pointerEvents: 'none' }}
      >
        <img
          src={`/assets/aliens/alien${alien.id}.png`}
          alt={alien.name}
          draggable={false}
          onError={(e) => {
            // Fallback: colored silhouette circle
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
          className={`object-contain select-none ${isCenter ? 'float-anim' : ''}`}
          style={{
            height: isCenter ? '320px' : '220px',
            width: 'auto',
            maxWidth: isCenter ? '320px' : '220px',
            userSelect: 'none',
          }}
        />

        {/* Fallback placeholder when image not yet added */}
        <div
          className="hidden items-center justify-center rounded-full select-none"
          style={{
            width: isCenter ? '240px' : '160px',
            height: isCenter ? '240px' : '160px',
            background: `radial-gradient(circle, ${alien.color}33, transparent)`,
            border: `3px solid ${alien.color}66`,
            color: alien.color,
            fontFamily: 'Orbitron, monospace',
            fontSize: isCenter ? '4rem' : '2.5rem',
            fontWeight: '900',
          }}
        >
          {alien.name.charAt(0)}
        </div>
      </motion.div>
    );
  };

  return (
    <div
      className="relative w-full select-none drag-cursor"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => { dragStart.current = null; isDragging.current = false; }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
    >
      {/* Hint label */}
      <div
        className="text-center mb-2 font-orbitron text-[9px] tracking-widest opacity-40"
        style={{ color: '#0a1a0a' }}
      >
        DRAG OR DOUBLE-CLICK TO NAVIGATE
      </div>

      {/* 3D viewport */}
      <div
        className="carousel-viewport relative"
        style={{ height: '360px', width: '100%' }}
      >
        {renderSlot(aliens[prevIdx],  'left')}
        {renderSlot(aliens[activeIndex], 'center')}
        {renderSlot(aliens[nextIdx],  'right')}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {aliens.map((_, i) => (
          <motion.button
            key={i}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            whileHover={{ scale: 1.3 }}
            style={{
              width: i === activeIndex ? '20px' : '8px',
              height: '8px',
              borderRadius: '9999px',
              background: i === activeIndex ? '#0a1a0a' : 'rgba(10,26,10,0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              pointerEvents: 'all',
            }}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="text-center mt-3">
        <span className="font-orbitron text-[10px] tracking-widest" style={{ color: '#0a1a0a', opacity: 0.45 }}>
          {String(activeIndex + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}
        </span>
      </div>
    </div>
  );
};

export default AlienCarousel;
