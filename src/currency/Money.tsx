"use client";

import { useCurrency } from "./index";

interface MoneyProps {
  /** ALWAYS in USD (the platform's native unit). The conversion to the display
   *  currency happens here and nowhere else — nothing upstream of this
   *  component should ever hold rupees. */
  amount: number;
  /** Thousands separators and 0–2 decimals instead of a fixed 2 (pot/balance sites). */
  grouped?: boolean;
  /** Drop the "LKR" prefix because the surrounding context already states the
   *  unit, or a coin icon next to this component already does. */
  unitless?: boolean;
  className?: string;
}

/**
 * The single money renderer. Every amount the player sees goes through here, so
 * the USD↔LKR toggle is one switch rather than scattered across every component.
 */
export function Money({ amount, grouped, unitless, className }: MoneyProps) {
  const { fmt } = useCurrency();
  return <span className={className}>{fmt(amount, { grouped, unitless })}</span>;
}
