// ShimmerButton — Electric Wilderness palette for Appât du Nord v17.1
import React, { CSSProperties } from "react";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#00CFFF",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "6px",
      background = "rgba(0,207,255,0.10)",
      className,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            border: "1px solid rgba(0,207,255,0.35)",
            borderRadius,
            background,
            cursor: "pointer",
            transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease",
            ...style,
          } as CSSProperties
        }
        className={className}
        ref={ref}
        {...props}
      >
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              animation: `shimmerSlide ${shimmerDuration} ease-in-out infinite alternate`,
              aspectRatio: "1",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "-100%",
                animation: `spinAround calc(${shimmerDuration} * 2) infinite linear`,
                background: `conic-gradient(from calc(270deg - (var(--spread) * 0.5)), transparent 0, ${shimmerColor} var(--spread), transparent var(--spread))`,
                filter: "blur(2px)",
              }}
            />
          </div>
        </div>
        <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
        <div
          style={{
            position: "absolute",
            inset: shimmerSize,
            background,
            borderRadius,
            zIndex: 0,
          }}
        />
        <style>{`
          @keyframes shimmerSlide {
            to { transform: translate(calc(100% - 100%), 0); }
          }
          @keyframes spinAround {
            0% { transform: translateZ(0) rotate(0deg); }
            15%, 35% { transform: translateZ(0) rotate(90deg); }
            65%, 85% { transform: translateZ(0) rotate(270deg); }
            100% { transform: translateZ(0) rotate(360deg); }
          }
        `}</style>
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };
