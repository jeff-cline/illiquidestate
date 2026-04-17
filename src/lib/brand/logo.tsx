import * as React from "react";
import { colors } from "./tokens";

type LogoProps = {
  variant?: "wordmark" | "monogram" | "stacked";
  color?: string;
  className?: string;
  accentColor?: string;
};

/**
 * Illiquid Estate wordmark.
 *
 * Design: editorial serif wordmark with a subtle rising bar beneath "Illiquid" —
 * visual reference to the "silent" tax / hidden liquidity gap. Restrained, no icon,
 * no gimmicks. Pairs with the social graphics aesthetic.
 */
export function Logo({
  variant = "wordmark",
  color = colors.ink,
  accentColor = colors.sienna,
  className,
}: LogoProps) {
  if (variant === "monogram") {
    return (
      <svg viewBox="0 0 100 100" className={className} aria-label="Illiquid Estate">
        <text
          x="50"
          y="66"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="72"
          fontWeight="400"
          fill={color}
        >
          IE
        </text>
        <line x1="18" y1="82" x2="82" y2="82" stroke={accentColor} strokeWidth="3" />
      </svg>
    );
  }

  if (variant === "stacked") {
    return (
      <svg viewBox="0 0 320 140" className={className} aria-label="Illiquid Estate">
        <text
          x="160"
          y="62"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="48"
          fontWeight="400"
          fill={color}
          letterSpacing="-0.02em"
        >
          Illiquid
        </text>
        <text
          x="160"
          y="108"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="48"
          fontStyle="italic"
          fontWeight="400"
          fill={accentColor}
          letterSpacing="-0.02em"
        >
          Estate
        </text>
        <line x1="120" y1="120" x2="200" y2="120" stroke={color} strokeWidth="2" />
      </svg>
    );
  }

  // wordmark (default)
  return (
    <svg viewBox="0 0 460 90" className={className} aria-label="Illiquid Estate">
      <text
        x="0"
        y="60"
        fontFamily="Georgia, serif"
        fontSize="56"
        fontWeight="400"
        fill={color}
        letterSpacing="-0.02em"
      >
        Illiquid
      </text>
      <text
        x="224"
        y="60"
        fontFamily="Georgia, serif"
        fontSize="56"
        fontStyle="italic"
        fontWeight="400"
        fill={accentColor}
        letterSpacing="-0.02em"
      >
        Estate
      </text>
      <line x1="0" y1="74" x2="440" y2="74" stroke={color} strokeWidth="1" />
    </svg>
  );
}
