import * as React from "react";

type CtaButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

export function CtaButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  ariaLabel,
}: CtaButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="inline-flex items-center gap-3 bg-ink px-8 py-4 font-serif text-lg tracking-wide text-cream transition hover:bg-ink80 disabled:cursor-not-allowed disabled:opacity-60 md:text-xl"
    >
      {children}
      <span aria-hidden="true">→</span>
    </button>
  );
}
