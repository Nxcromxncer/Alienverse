import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/*
====================================================
 OMNITRIX SIDEBAR
----------------------------------------------------
• Omnitrix fixed on left
• Ubuntu-style floating navigation
• Active button centered
• Click Omnitrix → toggle buttons
====================================================
*/

const NAV = [
  { to: "/", label: "HOME" },
  { to: "/aliens", label: "ALIEN" },
  { to: "/about", label: "INFO" },
];

const ITEM_HEIGHT = 70;

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // show / hide buttons
  const [open, setOpen] = useState(true);

  const activeIndex = NAV.findIndex(
    (n) => n.to === location.pathname
  );

  return (
    <div
      style={{
        position: "fixed",
        left: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        alignItems: "center",
        gap: "26px",
        zIndex: 50,
      }}
    >
      {/* ================= OMNITRIX ================= */}
      <motion.div
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen(!open)}
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          overflow: "hidden",
          cursor: "pointer",
          marginTop: "20px",
          border: "3px solid #1a8c2e",
          background: "#050505",

          boxShadow: `
            8px 8px 20px #000,
            -5px -5px 14px #1a1a1a,
            inset 5px 5px 12px #000,
            inset -3px -3px 10px #1a1a1a,
            0 0 20px rgba(26,140,46,.35)
          `,
        }}
      >
        <img
          src="/assets/omnitrix.png"
          alt="Omnitrix"
          draggable="false"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </motion.div>

      {/* ================= BUTTON AREA ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.8 }}
            transition={{ duration: 0.35 }}
            style={{
              position: "relative",
              height: ITEM_HEIGHT * NAV.length,
              width: 120,
            }}
          >
            {NAV.map((item, i) => {
              const offset = i - activeIndex;
              const active = i === activeIndex;

              return (
                <motion.button
                  key={item.to}
                  onClick={() => navigate(item.to)}
                  animate={{
                    y: offset * ITEM_HEIGHT,
                    scale: active ? 1.15 : 0.9,
                    opacity: active ? 1 : 0.5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 22,
                  }}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "110px",
                    height: "52px",
                    borderRadius: "16px",
                    border: "none",
                    cursor: "pointer",

                    background: active
                      ? "linear-gradient(145deg,#1fbf4a,#0d6e26)"
                      : "linear-gradient(145deg,#0c0c0c,#151515)",

                    boxShadow: active
                      ? `
                        0 0 18px rgba(26,140,46,.6),
                        inset 3px 3px 8px rgba(0,0,0,.6),
                        inset -3px -3px 8px rgba(60,255,140,.2)
                      `
                      : `
                        6px 6px 12px #000,
                        -4px -4px 10px #1a1a1a,
                        inset 3px 3px 6px #000
                      `,

                    color: active ? "#eaffea" : "#666",
                    fontFamily: "Orbitron, monospace",
                    fontWeight: active ? 900 : 600,
                    letterSpacing: "0.15em",
                  }}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}