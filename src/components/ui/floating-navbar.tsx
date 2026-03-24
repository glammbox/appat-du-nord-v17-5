"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - (scrollYProgress.getPrevious() ?? 0);
      if (scrollYProgress.get() < 0.08) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto z-[5000] items-center justify-center",
          className
        )}
      >
        <div
          className="flex items-center gap-1 rounded-full px-3 py-2"
          style={{
            background: 'rgba(6,7,10,0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,207,255,0.18)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {navItems.map((navItem, idx) => (
            <button
              key={`link-${idx}`}
              onClick={(e) => {
                e.preventDefault();
                navItem.onClick?.();
              }}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#C8D3E2',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.18s, background 0.18s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = '#00CFFF'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,207,255,0.08)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = '#C8D3E2'
                ;(e.currentTarget as HTMLElement).style.background = 'transparent'
              }}
            >
              <span>{navItem.icon}</span>
              <span>{navItem.name}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
