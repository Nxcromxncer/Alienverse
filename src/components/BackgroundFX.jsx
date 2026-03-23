import React from 'react';

/**
 * BackgroundFX — Ben 10 Recalibrated style background
 * Green base with diagonal dark panel lines cutting across
 */
const BackgroundFX = () => (
  <>
    {/* Base green + diagonal panels via CSS */}
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: '#3aaa52',
      }}
    />
    {/* Diagonal dark panel — top-left large */}
    <div
      className="fixed pointer-events-none z-0"
      style={{
        top: 0, left: 0,
        width: '60vw', height: '55vh',
        background: '#2d9444',
        clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0 100%)',
      }}
    />
    {/* Diagonal panel — bottom right */}
    <div
      className="fixed pointer-events-none z-0"
      style={{
        bottom: 0, right: 0,
        width: '50vw', height: '50vh',
        background: '#259038',
        clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)',
      }}
    />
    {/* Mid dark stripe — slanted center divider */}
    <div
      className="fixed pointer-events-none z-0"
      style={{
        top: '30%', left: '30%',
        width: '80vw', height: '45vh',
        background: '#28974',
        opacity: 0.15,
        clipPath: 'polygon(0 0, 20% 0, 100% 100%, 80% 100%)',
        borderLeft: '3px solid rgba(0,0,0,0.08)',
      }}
    />
  </>
);

export default BackgroundFX;
