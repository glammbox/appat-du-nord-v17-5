import React, { useRef, useState } from "react";
import { motion } from "motion/react";

export interface TabItem {
  id: string;
  label: string;
  color: string;
}

interface BoutiqueTabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}

export function BoutiqueTabs({ tabs, activeId, onChange }: BoutiqueTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeTab = tabs.find((t) => t.id === activeId);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        gap: "0.4rem",
        overflowX: "auto",
        scrollbarWidth: "none",
        paddingBottom: "2px",
        flexWrap: "wrap",
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        const isHovered = tab.id === hoveredId;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            onMouseEnter={() => setHoveredId(tab.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              position: "relative",
              padding: "0.45rem 1rem",
              border: `1.5px solid ${isActive ? tab.color : isHovered ? tab.color + "66" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "100px",
              background: isActive ? tab.color + "22" : isHovered ? tab.color + "11" : "rgba(255,255,255,0.03)",
              color: isActive ? tab.color : isHovered ? tab.color + "cc" : "#8899AA",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.18s ease",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {isActive && (
              <motion.span
                layoutId="boutique-tab-indicator"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "100px",
                  background: tab.color + "18",
                  border: `1.5px solid ${tab.color}`,
                  boxShadow: `0 0 12px ${tab.color}44`,
                  zIndex: 0,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{tab.label}</span>
          </button>
        );
      })}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
